import { Component, Input } from '@angular/core';

import { ComponentDirectory } from './componentdirectory.provider'

@Component({
  selector: "navbar",
  template: `
  <nav class="navbar navbar-inverse navbar-fixed-top" onclick="exitFullscreen()">
  <div class="container-fluid">

    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Modular dashboard</a>
    </div>

    <div id="navbar" class="navbar-collapse collapse">

      <ul class="nav navbar-nav navbar-left" *ngFor="let tab of tabs">
          <li><a href="#"> {{ tab }} </a></li>
      </ul>

      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Help</a></li>
      </ul>

      <form class="navbar-form navbar-right">
        <input name="componentName" type="text" class="form-control" [(ngModel)]="compName" placeholder="Create component">
        <input type="submit" class="form-control" value="Create" (click)="create()">
      </form>

      </div>
    </div>

  </nav>
  `
})
export class NavBar  {
  tabs = [];

  constructor(private directory: ComponentDirectory) {
    this.tabs = Object.keys(directory.tabs);

    directory.LoadingEvent_.subscribe(
      (x) => { this.tabs = Object.keys(directory.tabs); console.log(this.tabs) }
    );
  }

  close() {
    return true;
  }

}
