import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';
declare var $:any;

@Component({
  selector: "seriesTracker",
  template: `
  <span>
    {{ name }}:
    <input type=text [(ngModel)]="episode" (change)="updateEp()"
     style="margin: 10px 0px; padding: 0px; max-width: 18%">

    <input type=button value="Next episodes" (click)="openNew()"
    (window:message)="onMessage($event)">
  </span>
      `,
})
export class seriesTracker{
  selector = "seriesTracker";
  name;
  seriesName = "";
  episode = 0;
  directory;
  to;
  iframe;
  url;
  dbHandle: any;
  iframeComponent: any;

  constructor() {
    this.dbHandle = this.directory.firebaseService;
    this.directory.importType(this, "iframeComponent");
  }

  openNew() {
    if (this.url == "gogo") this.iframeComponent.prototype.address = "https://ww1.gogoanime.io/" + this.name + "-episode-"+(this.episode+1);
    else this.iframeComponent.prototype.address = this.url;

    this.iframeComponent.prototype.creator = this;

    this.iframeComponent.prototype.ngAfterViewInit = function() {
      this.iframe.nativeElement.allowFullscreen = true;

      this.creator.giveLink(this);
    }
    this.directory.loadComponentsFromType(this.iframeComponent);

    this.openNew = function() {} //EI voi kutsua uudestaan :\

  }

  giveLink(this_) {
    this.iframe = this_;
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
  }
}
