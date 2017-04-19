import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';
declare var $:any;

import { FirebaseService } from '../firebase.service'

// import { DynamicComponent } from './dynamiccomponent'
import { iframeComponent } from './iframe.component'

@Component({
  selector: "seriesTracker",
  template: `
  <span>
    {{ name }}:
    <input type=text [(ngModel)]="episode" (change)="updateEp()"
     style="margin: 10px 0px; padding: 0px; max-width: 18%">

    <input type=button value="Next episode" (click)="openNew()"
    (window:message)="onMessage($event)">
  </span>
      `,
})
export class seriesTracker implements OnDestroy{
  name;
  seriesName = "";
  episode = 0;
  directory;
  public to;
  iframe;
  url;

  constructor(private dbHandle: FirebaseService) {
  }

  openNew() {
    if (this.url == "gogo") iframeComponent.prototype.address = "https://ww1.gogoanime.io/" + this.name + "-episode-"+(this.episode+1);
    else iframeComponent.prototype.address = this.url;

    iframeComponent.prototype.creator = this;

    iframeComponent.prototype.ngAfterViewInit = function() {
      this.iframe.nativeElement.allowFullscreen = true;

      this.creator.giveLink(this);
    }
    this.directory.loadComponentsFromType(iframeComponent);
  }

  giveLink(this_) {
    this.iframe = this_;
    console.log("adding " + this)
  }

  close() {
    return true;
  }

  ngAfterContentInit() {
     this.dbHandle.bind(this, "episode", "/epTrack/"+this.name+"/episode");
     this.dbHandle.getUrl(this, "url", this.name)
  }

  updateEp($event) {
    this.dbHandle.update(this.episode, "/epTrack/"+this.name+"/episode");
  }

  ngOnDestroy() {
    console.log("Destroied AnimeComponent")
  }

  // onMessage(event) {
  //   if(event.data == "ready") {
  //     this.iframe.iframe.nativeElement.className = "fullScreen";
  //     if (this.time != 0) {
  //       let data = ["time", this.time];
  //       this.iframe.iframe.nativeElement.contentWindow.postMessage(data, "*");
  //     }
  //
  //   }
  //   if(event.data == "done") {
  //     this.iframe.iframe.nativeElement.className = "";
  //     this.dbHandle.update("0", "/time");
  //   }
  //   if(event.data[0] == "time") {
  //     this.time = event.data[1];
  //     this.dbHandle.update(this.time, "/time");
  //   }
  // }
}
