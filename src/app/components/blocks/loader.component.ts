import { Component, OnDestroy, Input } from '@angular/core';

import { ComponentDirectory } from '../componentdirectory.provider'

import { CalendarComponent } from './calendar.component'
import { CardsComponent } from './cards.component'
import { seriesTracker } from './seriesTracker.component'

import { DynamicComponent } from './dynamiccomponent'
import { FirebaseService } from '../firebase.service'

@Component({
  selector: "loaderBlock",
  template: `<input type=submit (click)="addComponent()" value="Create"/>
  <select [(ngModel)]="compSelect">
    <option *ngFor="let component of compNames" value={{component}}>{{component}}</option>
  </select><br>
  `,
})
export class LoaderBlockComponent implements OnDestroy {
components = { 'calendar': CalendarComponent }
compNames = Object.keys(this.components);
compSelect;

  constructor(private dbHandle: FirebaseService) {
    console.log("Created LoaderBlockComponent");
    dbHandle.getAnimes(this, this.compNames)
  }

  ngOnDestroy() {
    console.log("Destroied LoaderBlockComponent");
  }

  addComponent() {
    let component = (this.components[this.compSelect])?this.components[this.compSelect]:seriesTracker;
    seriesTracker.prototype.name = this.compSelect;
    this.directory.loadComponentsFromType(component);
  }

}
