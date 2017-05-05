import { Component, Input } from '@angular/core';
declare var Notification: any;

@Component({
  selector: "alerts",
  template: `
  <input type=submit (click)="coffee()" value="Coffee"/>
  <input type=submit (click)="break(1)" value="1hBreak"/>
  <input type=submit (click)="logTimes()" value="log Timers"/>
  <br>
  `,
})
export class alertsComponent  {
  alerts = {}

  constructor() {  }

  close() {
    return true;
  }

  coffee() {
    this.alerts["coffee"] = new timer(() =>  new Notification("Get ya coffee"), 1000*60*45);
  }

  break(hours) {
    this.alerts["break"] = new timer(() =>  new Notification("Done with ya break"), 1000*60*60*hours);
  }

  logTimes() {
    for (var key in this.alerts) {
      console.log(this.alerts[key].getTimeLeft());
    }
  }
}

class timer {
    id;
    started;
    running;
    remaining;

    constructor(callback, delay) {
      this.remaining = delay;
      this.start(callback, delay);
    }

    start(callback, delay) {
        this.running = true
        this.started = new Date()
        this.id = setTimeout(callback, this.remaining)
    }

    getTimeLeft(){
      let A = this.remaining - ( Date.now() - this.started )
      let seconds=Math.floor((A/1000)%60)
      let minutes=Math.floor((A/(1000*60))%60)
      let hours=Math.floor((A/(1000*60*60))%24)

      return hours+"h "+minutes+"min "+seconds+"s";
    }

}
