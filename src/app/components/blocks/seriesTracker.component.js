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
var firebase_service_1 = require('../firebase.service');
// import { DynamicComponent } from './dynamiccomponent'
var iframe_component_1 = require('./iframe.component');
var seriesTracker = (function () {
    function seriesTracker(dbHandle) {
        this.dbHandle = dbHandle;
        this.seriesName = "";
        this.episode = 0;
    }
    seriesTracker.prototype.openNew = function () {
        if (this.url == "gogo")
            iframe_component_1.iframeComponent.prototype.address = "https://ww1.gogoanime.io/" + this.name + "-episode-" + (this.episode + 1);
        else
            iframe_component_1.iframeComponent.prototype.address = this.url;
        iframe_component_1.iframeComponent.prototype.creator = this;
        iframe_component_1.iframeComponent.prototype.ngAfterViewInit = function () {
            this.iframe.nativeElement.allowFullscreen = true;
            this.creator.giveLink(this);
        };
        this.directory.loadComponentsFromType(iframe_component_1.iframeComponent);
    };
    seriesTracker.prototype.giveLink = function (this_) {
        this.iframe = this_;
        console.log("adding " + this);
    };
    seriesTracker.prototype.close = function () {
        return true;
    };
    seriesTracker.prototype.ngAfterContentInit = function () {
        this.dbHandle.bind(this, "episode", "/epTrack/" + this.name + "/episode");
        this.dbHandle.getUrl(this, "url", this.name);
    };
    seriesTracker.prototype.updateEp = function ($event) {
        this.dbHandle.update(this.episode, "/epTrack/" + this.name + "/episode");
    };
    seriesTracker.prototype.ngOnDestroy = function () {
        console.log("Destroied AnimeComponent");
    };
    seriesTracker = __decorate([
        core_1.Component({
            selector: "seriesTracker",
            template: "\n  <span>\n    {{ name }}:\n    <input type=text [(ngModel)]=\"episode\" (change)=\"updateEp()\"\n     style=\"margin: 10px 0px; padding: 0px; max-width: 18%\">\n\n    <input type=button value=\"Next episode\" (click)=\"openNew()\"\n    (window:message)=\"onMessage($event)\">\n  </span>\n      ",
        }), 
        __metadata('design:paramtypes', [firebase_service_1.FirebaseService])
    ], seriesTracker);
    return seriesTracker;
}());
exports.seriesTracker = seriesTracker;
//# sourceMappingURL=seriesTracker.component.js.map