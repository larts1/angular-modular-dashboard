import { Component, OnDestroy, Input } from '@angular/core';

@Component({
  selector: "loaderBlock",
  template: `<input type=submit (click)="addComponent()" value="Create Tracker:"/>
  <select [(ngModel)]="compSelect">
    <option *ngFor="let component of compNames" value={{component}}>{{component}}</option>
  </select><br>
  `,
})
export class loaderBlock implements OnDestroy {
selector = "loaderBlock";
components = {}
compNames = Object.keys(this.components);
compSelect;
directory;
dbHandle:any;

  constructor() {
    console.log("Created LoaderBlockComponent");
    this.dbHandle = this.directory.firebaseService; //servicet otetaan directoryltä.
    this.dbHandle.getAnimes(this, this.compNames);
  }

  ngOnDestroy() {
    console.log("Destroied LoaderBlockComponent");
  }

  addComponent() {
    this.directory.loadComponent("seriesTracker", { "name" : this.compSelect });
  }
}
