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
var iframe_component_1 = require('./iframe.component');
var AnimeComponent = (function () {
    function AnimeComponent(dbHandle) {
        this.dbHandle = dbHandle;
        this.name = "Anime";
        this.seriesName = "";
        this.episode = 0;
        // this.seriesName = seriesName;
    }
    AnimeComponent.prototype.openNew = function () {
        iframe_component_1.iframeComponent.prototype.address = "https://ww1.gogoanime.io/one-piece-episode-" + (this.episode + 1);
        iframe_component_1.iframeComponent.prototype.creator = this;
        iframe_component_1.iframeComponent.prototype.ngAfterViewInit = function () {
            this.iframe.nativeElement.allowFullscreen = true;
            console.log(this.iframe.nativeElement);
            this.creator.giveLink(this);
        };
        this.directory_.loadComponentsFromType(iframe_component_1.iframeComponent);
    };
    AnimeComponent.prototype.giveLink = function (this_) {
        this.iframe = this_;
        console.log("adding " + this);
    };
    AnimeComponent.prototype.close = function () {
        return true;
    };
    AnimeComponent.prototype.ngAfterContentInit = function () {
        this.dbHandle.bind(this, "to");
        this.dbHandle.bind(this, "episode");
        this.dbHandle.bind(this, "time");
    };
    AnimeComponent.prototype.turnOn = function () {
        this.dbHandle.play();
        this.iframe.iframe.nativeElement.contentWindow.postMessage("pause", "*");
    };
    AnimeComponent.prototype.turnOff = function () {
        this.dbHandle.pause();
        console.log(this.iframe.iframe.nativeElement.contentWindow);
        this.iframe.iframe.nativeElement.contentWindow.postMessage("play", "*");
    };
    AnimeComponent.prototype.updateTo = function ($event) {
        this.dbHandle.update(this.to, "/to");
    };
    AnimeComponent.prototype.updateEp = function ($event) {
        this.dbHandle.update(this.episode, "/episode");
    };
    AnimeComponent.prototype.ngOnDestroy = function () {
        console.log("Destroied AnimeComponent");
    };
    AnimeComponent.prototype.setDirectory = function (ComponentDirectory) {
        this.directory_ = ComponentDirectory;
    };
    AnimeComponent.prototype.onMessage = function (event) {
        if (event.data == "ready") {
            this.iframe.iframe.nativeElement.className = "fullScreen";
            if (this.time != 0) {
                var data = ["time", this.time];
                this.iframe.iframe.nativeElement.contentWindow.postMessage(data, "*");
            }
        }
        if (event.data == "done") {
            this.iframe.iframe.nativeElement.className = "";
            this.dbHandle.update("0", "/time");
        }
        if (event.data[0] == "time") {
            this.time = event.data[1];
            this.dbHandle.update(this.time, "/time");
        }
    };
    AnimeComponent = __decorate([
        core_1.Component({
            selector: "anime",
            template: "\n  <input type=button value=\"pause\" (click)=\"turnOn()\">\n  <input type=button value=\"play\"  (click)=\"turnOff()\"><br>\n\n  <span>\n    <label>timeout</label>:\n    <input type=text [(ngModel)]=\"to\" (change)=\"updateTo()\"\n     style=\"margin: 10px 0px; padding: 0px; max-width: 18%\"><br>\n\n    current :\n    <input type=text [(ngModel)]=\"episode\" (change)=\"updateEp()\"\n     style=\"margin: 10px 0px; padding: 0px; max-width: 18%\">\n\n    <input type=button value=\"Next episode\" (click)=\"openNew()\"\n    (window:message)=\"onMessage($event)\">\n  </span>\n      ",
        }), 
        __metadata('design:paramtypes', [firebase_service_1.FirebaseService])
    ], AnimeComponent);
    return AnimeComponent;
}());
exports.AnimeComponent = AnimeComponent;
//# sourceMappingURL=anime.component.js.map