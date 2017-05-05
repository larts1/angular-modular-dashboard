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
var seriesTracker = (function () {
    function seriesTracker() {
        this.selector = "seriesTracker";
        this.episode = 0;
        this.dbHandle = this.directory.firebaseService;
        this.tvdbService = this.directory.tvdbService;
    }
    seriesTracker.prototype.openNew = function () {
        var url = this.url.replace("$name$", this.name);
        url = url.replace("$episode$", this.episode + 1);
        this.directory.loadComponent("iframeComponent", { "address": url });
    };
    seriesTracker.prototype.close = function () {
        return true;
    };
    seriesTracker.prototype.ngAfterContentInit = function () {
        this.dbHandle.bind(this, "episode", "/epTrack/" + this.name + "/episode");
    };
    seriesTracker.prototype.updateEp = function ($event) {
        this.dbHandle.update(this.episode, "/epTrack/" + this.name + "/episode");
        this.tvdbService.bindAirDate(this.name, this.episode, this, "airdate");
    };
    seriesTracker.prototype.ngOnDestroy = function () {
    };
    seriesTracker = __decorate([
        core_1.Component({
            selector: "seriesTracker",
            template: "\n  <span>\n    {{ name }}:\n    <input type=text [(ngModel)]=\"episode\" (change)=\"updateEp()\"\n     style=\"margin: 10px 0px; padding: 0px; max-width: 18%\">\n     {{airdate}}\n\n    <input type=button value=\"Next episodes\" (click)=\"openNew()\"\n    (window:message)=\"onMessage($event)\">\n  </span>\n      ",
        }), 
        __metadata('design:paramtypes', [])
    ], seriesTracker);
    return seriesTracker;
}());
exports.seriesTracker = seriesTracker;
//# sourceMappingURL=seriesTracker.component.js.map