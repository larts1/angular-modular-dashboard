import { Component, Input, AfterViewInit, OnDestroy } from '@angular/core';
declare var $:any;

import { FirebaseService } from '../firebase.service'

import { ComponentDirectory } from '../componentdirectory.provider'
import { DynamicComponent } from './dynamiccomponent'
import { iframeComponent } from './iframe.component'

@Component({
  selector: "anime",
  template: `
  <input type=button value="pause" (click)="turnOn()">
  <input type=button value="play"  (click)="turnOff()"><br>

  <span>
    <label>timeout</label>:
    <input type=text [(ngModel)]="to" (change)="updateTo()"
     style="margin: 10px 0px; padding: 0px; max-width: 18%"><br>

    current :
    <input type=text [(ngModel)]="episode" (change)="updateEp()"
     style="margin: 10px 0px; padding: 0px; max-width: 18%">

    <input type=button value="Next episode" (click)="openNew()"
    (window:message)="onMessage($event)">
  </span>
      `,
})
export class AnimeComponent implements OnDestroy{
  name = "Anime";
  seriesName = "";
  episode = 0;
  public to;
  directory_;
  iframe;
  time;


  constructor(private dbHandle: FirebaseService) {
    // this.seriesName = seriesName;
  }

  openNew() {

    iframeComponent.prototype.address = "https://ww1.gogoanime.io/one-piece-episode-"+(this.episode+1);
    iframeComponent.prototype.creator = this;

    iframeComponent.prototype.ngAfterViewInit = function() {
      this.iframe.nativeElement.allowFullscreen = true;
      console.log(this.iframe.nativeElement);

      this.creator.giveLink(this);
    }

    this.directory_.loadComponentsFromType(iframeComponent);
  }

  giveLink(this_) {
    this.iframe = this_;
    console.log("adding " + this)
  }

  close() {
    return true;
  }

  ngAfterContentInit() {
     this.dbHandle.bind(this, "to");
     this.dbHandle.bind(this, "episode");
     this.dbHandle.bind(this, "time");
  }

  turnOn() {
    this.dbHandle.play();
    this.iframe.iframe.nativeElement.contentWindow.postMessage("pause", "*");
  }

  turnOff() {
    this.dbHandle.pause();
    console.log(this.iframe.iframe.nativeElement.contentWindow)
    this.iframe.iframe.nativeElement.contentWindow.postMessage("play", "*");
  }

  updateTo($event) {
    this.dbHandle.update(this.to, "/to");
  }

  updateEp($event) {
    this.dbHandle.update(this.episode, "/episode");
  }

  ngOnDestroy() {
    console.log("Destroied AnimeComponent")
  }

  setDirectory(ComponentDirectory) {
    this.directory_ = ComponentDirectory;
  }

  onMessage(event) {
    if(event.data == "ready") {
      this.iframe.iframe.nativeElement.className = "fullScreen";
      if (this.time != 0) {
        let data = ["time", this.time];
        this.iframe.iframe.nativeElement.contentWindow.postMessage(data, "*");
      }

    }
    if(event.data == "done") {
      this.iframe.iframe.nativeElement.className = "";
      this.dbHandle.update("0", "/time");
    }
    if(event.data[0] == "time") {
      this.time = event.data[1];
      this.dbHandle.update(this.time, "/time");
    }
  }
}
