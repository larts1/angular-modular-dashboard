import { Injectable, NgModule , ComponentFactory, EventEmitter, OnDestroy, ComponentFactoryResolver,
Compiler, ModuleWithComponentFactories, Component} from '@angular/core';

import { JitCompiler } from '@angular/compiler';

import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';

import { loaderBlock } from './blocks/loaderBlock.component'

import { FirebaseService } from './firebase.service'

import { Http, Response } from '@angular/http';
class DynamicModule {}

@NgModule({
    imports: [],
    providers: []
  })
  class sharedModule {}

@Injectable()
export class ComponentDirectory {
  components = { }
  factories: { [name: string]: ComponentFactory<any> } = {};
  DoneLoading_ = false;
  LoadingEvent_ = new EventEmitter(); //not ment for this? Hey, it works!
  compiler_;
  firebaseService = new FirebaseService()

  constructor(
        private compiler: JitCompiler, private http: Http,
        private resolver: ComponentFactoryResolver) {
    this.loadComponentsFromType(loaderBlock)
  }

  refreshComponent(name) {
    //Poistetaan vanha factory heti, jottei enää anneta sitä vahingossa
    if (name in this.factories) delete this.factories[name];

    //asynctoottinen, jää kesken
    this.loadComponentsFromUrl("http://localhost:3000/app/components/blocks/"+name+".component.js");
  }

  loadComponent(name, opts = {}) {
    //Poistetaan vanha factory heti, jottei enää anneta sitä vahingossa
    if (name in this.factories) delete this.factories[name];

    //asynctoottinen, jää kesken
    this.loadComponentsFromUrl("http://localhost:3000/app/components/blocks/"+name+".component.js", opts);
  }

  loadComponentsFromUrl(url, opts = {}) {
    this.http.get(url).subscribe( (x) => this.loadComponentsFromType( eval( x["_body"] ), opts ) );
    // this.http.get(url).subscribe( (x) => eval(x["_body"]) );
  }

  importType(caller, name) {
    this.http.get("http://localhost:3000/app/components/blocks/"+name+".component.js")
    .subscribe( (x) => caller[name] = eval(x["_body"]) );
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

  loadComponentsFromType(type, opts = {}) {

    type.prototype.directory = this;
    var selector = type.name

    //Välitetään optsit uudelle luokalle
    for (var key in opts) {
      type.prototype[key] = opts[key];
      console.log(type.prototype[key]);
    }

    @NgModule({
        imports: [BrowserModule, FormsModule, sharedModule],//.concat(<any>importsAdd),
        declarations: [type]
      })
      class DynamicModule {}
      this.loadComponentsFromModule(DynamicModule)
  }

  getFactory(name) {
    // If factory exists give this;
      if (this.factories[name]) return new Promise((resolve) => {
        resolve(this.factories[name])
      });

      //Palautetaan Promise compilaus eventtiin, toivotaan et sieltä tulee joskus
      return new Promise((resolve) => {
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
