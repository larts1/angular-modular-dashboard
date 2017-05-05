"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var alertsComponent = (function () {
    function alertsComponent() {
        this.alerts = {};
    }
    alertsComponent.prototype.close = function () {
        return true;
    };
    alertsComponent.prototype.coffee = function () {
        this.alerts["coffee"] = new timer(function () { return new Notification("Get ya coffee"); }, 1000 * 60 * 45);
    };
    alertsComponent.prototype.break = function (hours) {
        this.alerts["break"] = new timer(function () { return new Notification("Done with ya break"); }, 1000 * 60 * 60 * hours);
    };
    alertsComponent.prototype.logTimes = function () {
        for (var key in this.alerts) {
            console.log(this.alerts[key].getTimeLeft());
        }
    };
    alertsComponent = __decorate([
        core_1.Component({
            selector: "alerts",
            template: "\n  <input type=submit (click)=\"coffee()\" value=\"Coffee\"/>\n  <input type=submit (click)=\"break(1)\" value=\"1hBreak\"/>\n  <input type=submit (click)=\"logTimes()\" value=\"log Timers\"/>\n  <br>\n  ",
        }), 
        __metadata('design:paramtypes', [])
    ], alertsComponent);
    return alertsComponent;
}());
exports.alertsComponent = alertsComponent;
var timer = (function () {
    function timer(callback, delay) {
        this.remaining = delay;
        this.start(callback, delay);
    }
    timer.prototype.start = function (callback, delay) {
        this.running = true;
        this.started = new Date();
        this.id = setTimeout(callback, this.remaining);
    };
    timer.prototype.getTimeLeft = function () {
        var A = this.remaining - (Date.now() - this.started);
        var seconds = Math.floor((A / 1000) % 60);
        var minutes = Math.floor((A / (1000 * 60)) % 60);
        var hours = Math.floor((A / (1000 * 60 * 60)) % 24);
        return hours + "h " + minutes + "min " + seconds + "s";
    };
    return timer;
}());
//# sourceMappingURL=alerts.component.js.map