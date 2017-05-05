import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class tvdbService {
  tvdbConfig = {
                      apiKey: "F2023E1687010D5E",
                };
  headers;
  options;

  constructor(private http: Http) {
    // this.headers = new Headers(
    //   { 'Content-Type': 'text/plain' });
    // this.options = new RequestOptions({ headers: this.headers });

    // http.get("http://localhost:8888/token")
    //     .subscribe( (resp) => ( console.log("got it") )  );
  }

  getApiKey() {

  }

  bindAirDate(series, episode, target, elementName) {
     this.http.get("http://192.168.0.101:8888/airdate/"+series+"/"+episode)
         .subscribe( (resp) => ( target[elementName] = resp["_body"] )  );
  }

  getAirDate(series, episode, target, elementName) {
     return this.http.get("http://192.168.0.101:8888/airdate/"+series+"/"+episode);
  }
}
