import { Injectable, NgModule , ComponentFactory, EventEmitter, OnDestroy,
Compiler, ModuleWithComponentFactories, Component} from '@angular/core';

import { JitCompiler } from '@angular/compiler';

import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';

import { DynamicComponent } from './blocks/dynamiccomponent'
import { LoaderBlockComponent } from './blocks/loader.component'

import { CardsComponent } from './blocks/cards.component'

console.log(JSON.stringify(CardsComponent.prototype))

@Injectable()
export class ComponentDirectory {
  components = { }
  factories: { [name: string]: ComponentFactory<any> } = {};
  DoneLoading_ = false;
  LoadingEvent_ = new EventEmitter(); //not ment for this? Hey, it works!
  compiler_;

  constructor(
  private compiler: JitCompiler) {
    this.loadComponentsFromType(LoaderBlockComponent)
  }

  loadComponentsFromModule(Module) {
    this.DoneLoading_ = false;
    this.compiler_ = this.compiler.compileModuleAndAllComponentsAsync(Module);
    this.compiler_.then((data) =>{
      let componentFactories = data.componentFactories;

      for (let key in componentFactories) {
        let name = componentFactories[key].selector;
        this.factories[name] = componentFactories[key];
      }

      this.DoneLoading_ = true;
      this.LoadingEvent_.emit(Object.keys(this.factories));
    });
  }

  loadComponentsFromType(type) {

    type.prototype.directory = this;

    @NgModule({
        imports: [BrowserModule, FormsModule],
        declarations: [type],
      })
      class DynamicModule {}
      this.loadComponentsFromModule(DynamicModule)
  }

  loadComponentsFromObj(data: DynamicComponent) {
    @Component({
      selector: data.name,
      template: data.html,
    })
    class _DynamicComponent implements OnDestroy {

        ngOnDestroy() {
          console.log("Destroied DynamicComponent");
        }
    }

    this.loadComponentsFromType(_DynamicComponent);
  }

  getFactory(name) {
    // If factory exists give this;
      if (this.factories[name]) return new Promise((resolve) => {
        console.log("Promise was ready and returned straight away")
        resolve(this.factories[name])
      });

      //Palautetaan Promise compilaus eventtiin, toivotaan et sieltä tulee joskus
      return new Promise((resolve) => {
        console.log("Promise was not ready and returned promise")
         this.LoadingEvent_.subscribe(
           () => resolve(this.factories[name])
         );
      });
  }

  getComponent(name: string) {
    return this.factories[name];
  }

  getComponents(): string[] { // palauttaa nykyiset VALMIIT KOMPONENTIT
    return Object.keys(this.factories)
  }
}
