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
var http_1 = require('@angular/http');
var sleepTracker = (function () {
    function sleepTracker(http) {
        this.http = http;
    }
    sleepTracker.prototype.GoToBed = function () {
        var date = new Date();
        var time = date.getHours() + ":" + date.getMinutes() + ",";
        this.http.get("http://192.168.0.101:8888/sleepTracker/" + time).subscribe();
    };
    sleepTracker.prototype.GotUp = function () {
        var date = new Date();
        var time = date.getHours() + ":" + date.getMinutes() + "%0A";
        this.http.get("http://192.168.0.101:8888/sleepTracker/" + time).subscribe();
    };
    sleepTracker = __decorate([
        core_1.Component({
            selector: "sleepTracker",
            template: "\n  <input type=submit (click)=\"GoToBed()\" value=\"GoToBed\"/>\n  <input type=submit (click)=\"GotUp()\" value=\"GotUp\"/>\n  <br>\n  ",
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], sleepTracker);
    return sleepTracker;
}());
exports.sleepTracker = sleepTracker;
//# sourceMappingURL=sleepTracker.component.js.map