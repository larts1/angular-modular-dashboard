import { Component, Input, OnDestroy } from '@angular/core';

@Component({
  selector: "calendar",
  template: `<iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=WEEK&amp;height=600&amp;wkst=2&amp;bgcolor=%23FFFFFF&amp;src=l4ur11%40gmail.com&amp;color=%23691426&amp;src=5kfp63h7hpod8cp4ul3ma056n9c5p5jd%40import.calendar.google.com&amp;color=%232952A3&amp;ctz=Europe%2FHelsinki" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>`
})
export class CalendarComponent implements OnDestroy {
  name = "ddds";
  contents = "<h1>asd</h1>";

  constructor() {
    console.log("Created CalendarComponent");
  }

  ngOnDestroy() {
    console.log("Destroied CalendarComponent");
  }
}
