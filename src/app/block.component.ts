import {Component, ComponentFactoryResolver, AfterViewInit, QueryList,
  Injectable,ViewChild, ViewContainerRef, Input, Renderer, ElementRef,
  ComponentFactory, ChangeDetectorRef,
  } from '@angular/core'


import { ComponentDirectory } from './components/componentdirectory.provider'
import { Auth } from './Auth.service'


@Component({
  selector: 'block',
  templateUrl: '/app/blocks.html',
})

export class BlockComponent implements AfterViewInit{
  components_ = [];
  show_ = {};
  float_ = {};
  nextFloat_;
  admin="google-oauth2|105691295982317741699";
  access = false;

  constructor(private directory_: ComponentDirectory, private cdr: ChangeDetectorRef,
              private auth: Auth) { }

  ngAfterViewInit() {
      //Kun uusi componentti valmistuu katotaan oliks meillä se jo
      this.SyncComponents(this.directory_.getComponents());

      //Kirjaudutaan päivittämään komponentit aina kun directory sanoo hep
      this.directory_.LoadingEvent_.subscribe((components) => {

        let newComps: string[] = [];
        for (let key in components) {
          if (this.components_.indexOf(components[key]) == -1) {
            newComps.push(components[key]);
          }
        }

        this.SyncComponents(newComps);
        this.cdr.detectChanges(); // update page
      });

      this.auth.onUser(this.admin, (value) => {
      this.access = value;
      this.cdr.detectChanges(); // update page
    });

  }

  SyncComponents(comps: string[]) {

      this.components_.push.apply(this.components_, comps);

      this.nextFloat_ = "left";
      for (let component in this.components_) {
        this.show_[component] = false;
        this.float_[this.components_[component]] = this.nextFloat_;
        (this.nextFloat_ == "left") ? this.nextFloat_ = "right" :
                                      this.nextFloat_ = "left";
      }
      this.cdr.detectChanges(); // update page
  }

    toggle(event) {
      this.show_[event] = !this.show_[event];
      this.cdr.detectChanges(); // update page
    }

    delete(event) {
      this.show_[event] = false;
      let index = this.components_.indexOf(event);
      this.components_.splice(index, 1)

      this.SyncComponents([]);
      console.log(this.components_);

      this.cdr.detectChanges(); // update page
    }

    refresh(blockName) {
      //Poistetaan vanha
      this.show_[blockName] = false;

      this.directory_.refreshComponent(blockName);
      this.cdr.detectChanges(); // update page

      //Avataan uusi !!!
      this.show_[blockName] = true;
      this.cdr.detectChanges(); // update page
    }

}

@Component({
  selector: 'loader',
  inputs: ['component'],
  template: `<template #here></template>`,
})
export class LoaderComponent implements AfterViewInit {
  @ViewChild('here', {read: ViewContainerRef}) conteiner_: ViewContainerRef;
  @Input() component;

  loading_ = true;
  private nativeElement : Node;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
  private directory_: ComponentDirectory, private ref: ViewContainerRef) {
  }

  ngAfterViewInit() {
    this.directory_.getFactory(this.component).then(
    (factory: ComponentFactory<any>) => {
      let compRef = this.conteiner_.createComponent(factory);
      compRef.changeDetectorRef.detectChanges();
    });

  }
}
