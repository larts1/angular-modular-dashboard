import { Component, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: "sleepTracker",
  template: `
  <input type=submit (click)="GoToBed()" value="GoToBed"/>
  <input type=submit (click)="GotUp()" value="GotUp"/>
  <br>
  `,
})
export class sleepTracker  {
directory;


  constructor(private http: Http) {

  }

  GoToBed() {
    let date = new Date();
    let time = date.getHours() + ":" + date.getMinutes() + ",";
    this.http.get("http://192.168.0.101:8888/sleepTracker/"+time).subscribe();
  }

  GotUp() {
    let date = new Date();
    let time = date.getHours() + ":" + date.getMinutes() + "%0A";
    this.http.get("http://192.168.0.101:8888/sleepTracker/"+time).subscribe();
  }
}
