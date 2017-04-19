import { Component, Input, AfterViewInit, OnDestroy, ElementRef,
        ViewChild, HostListener} from '@angular/core';

import { FirebaseService } from '../firebase.service'
import {DomSanitizer} from "@angular/platform-browser";

import { Http } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: "Web Page",
  template: `
  <iframe #iframe [src]=url_ width="100%" style="height: 50vw"
  (window:message)="onMessage($event)"
  sandbox="allow-same-origin allow-scripts"></iframe>
  {{asd}}
      `,
})
export class iframeComponent{
  @ViewChild('iframe') iframe: ElementRef;
  creator;
  asd;
  // @HostListener('window:message', ['$event']) [src]=url_

  receiveMessage: EventListener;

  address;
  url_;

  constructor(private domSanitizer : DomSanitizer, private http: Http) { }

  ngOnInit() {

      this.url_ = this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.address);


        this.http.get('https://www.google.fi/')
                  .map( (asd) => console.log(asd) )
                  .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
                  .subscribe( () => {} );
  }

  onMessage(event) {
    console.log(event);
  }

  ngAfterViewInit() {}
}
