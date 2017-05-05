import { Component, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
declare var firebase: any ;

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
components = {};
compNames = [];
compSelect;
directory;
dbHandle:any;
tvdb: any;
tab() { return "Shows" }

  constructor() {
    console.log("Created LoaderBlockComponent");
    this.dbHandle = this.directory.firebaseService; //servicet otetaan directoryltä.
    this.tvdb = this.directory.tvdbService;

  }

  ngAfterContentInit() {
    firebase.database().ref("/epTrack").on('value', (snapshot) => {
      this.compNames.length = 0;
      for (let key in snapshot.val()) {
        this.compNames.push(key);
        this.components[key] = (snapshot.val()[key]);
      }
      this.getDates();
    });
  }

  ngOnDestroy() {
    console.log("Destroied LoaderBlockComponent");
  }

  addComponent() {
    this.directory.loadComponent("seriesTracker", {
      "name" : this.compSelect.split(";")[0],
      "url" : this.components[this.compSelect.split(";")[0]]["url"]
     });
  }

  getDates() {
    console.log(this.components);
    let newNames = [];

    for (var key in this.compNames) {

      let anime = this.compNames[key].split(";")[0];
      let episode = this.components[anime]["episode"] + 1;

      if (! ("tvdb" in this.components[anime] )) {
        newNames.push( anime +";"+(episode) );
      } else {
        this.tvdb.getAirDate(this.components[anime]["tvdb"], (episode)).subscribe(
          (airdate) => newNames.push( anime +";"+(episode)+";"+ this.getTimer(airdate["_body"]) )
        )
      }

    }

    this.compNames = newNames;
  }

  getTimer(string) {
    if (Date.parse(string) < -590114664000) return ("outOf " + string);
    let timeToAirms = ( Date.parse(string) - Date.now() );
    let timeToAir = Math.floor(timeToAirms / (1000*60*60*24))
    return ( timeToAir + " days" );
  }
}
