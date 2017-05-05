import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';
declare var $:any;

@Component({
  selector: "seriesTracker",
  template: `
  <span>
    {{ name }}:
    <input type=text [(ngModel)]="episode" (change)="updateEp()"
     style="margin: 10px 0px; padding: 0px; max-width: 18%">
     {{airdate}}

    <input type=button value="Next episodes" (click)="openNew()"
    (window:message)="onMessage($event)">
  </span>
      `,
})
export class seriesTracker{
  selector = "seriesTracker";
  name;
  episode = 0;
  directory;
  to;
  url;
  dbHandle: any;
  iframeComponent: any;
  tvdbService: any;
  airdate;

  constructor() {
    this.dbHandle = this.directory.firebaseService;
    this.tvdbService = this.directory.tvdbService;
  }

  openNew() {
    let url = this.url.replace("$name$", this.name);
    url = url.replace("$episode$", this.episode+1);
    this.directory.loadComponent("iframeComponent", { "address": url });
  }

  close() {
    return true;
  }

  ngAfterContentInit() {
     this.dbHandle.bind(this, "episode", "/epTrack/"+this.name+"/episode");
  }

  updateEp($event) {
    this.dbHandle.update(this.episode, "/epTrack/"+this.name+"/episode");
    this.tvdbService.bindAirDate(this.name, this.episode, this, "airdate")
  }

  ngOnDestroy() {
  }
}
