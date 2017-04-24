import { Component, Input, AfterViewInit, OnDestroy, ElementRef,
        ViewChild, HostListener} from '@angular/core';

import { DomSanitizer } from "@angular/platform-browser";

import { Http } from '@angular/http';

@Component({
  selector: "iframeComponent",
  template: `
  <iframe #iframe [src]=url_ width="100%" style="height: 50vw"
  (window:message)="onMessage($event)"
  sandbox="allow-same-origin allow-scripts"></iframe>
      `,
})
export class iframeComponent{
  @ViewChild('iframe') iframe: ElementRef;
  selector = "iframeComponent";
  creator;
  dbHandle : any;
  directory;

  receiveMessage: EventListener;

  address;
  url_;

  constructor(private domSanitizer : DomSanitizer, private http: Http) {
    this.dbHandle = this.directory.firebaseService;
   }

  ngOnInit() {
      this.url_ = this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.address);
  }

  onMessage(event) {
    console.log(event);
  }

  ngAfterViewInit() {}
}
