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
var loaderBlock = (function () {
    function loaderBlock() {
        this.selector = "loaderBlock";
        this.components = {};
        this.compNames = [];
        console.log("Created LoaderBlockComponent");
        this.dbHandle = this.directory.firebaseService; //servicet otetaan directoryltä.
        this.tvdb = this.directory.tvdbService;
    }
    loaderBlock.prototype.tab = function () { return "Shows"; };
    loaderBlock.prototype.ngAfterContentInit = function () {
        var _this = this;
        firebase.database().ref("/epTrack").on('value', function (snapshot) {
            _this.compNames.length = 0;
            for (var key in snapshot.val()) {
                _this.compNames.push(key);
                _this.components[key] = (snapshot.val()[key]);
            }
            _this.getDates();
        });
    };
    loaderBlock.prototype.ngOnDestroy = function () {
        console.log("Destroied LoaderBlockComponent");
    };
    loaderBlock.prototype.addComponent = function () {
        this.directory.loadComponent("seriesTracker", {
            "name": this.compSelect.split(";")[0],
            "url": this.components[this.compSelect.split(";")[0]]["url"]
        });
    };
    loaderBlock.prototype.getDates = function () {
        var _this = this;
        console.log(this.components);
        var newNames = [];
        var _loop_1 = function() {
            var anime = this_1.compNames[key].split(";")[0];
            var episode = this_1.components[anime]["episode"] + 1;
            if (!("tvdb" in this_1.components[anime])) {
                newNames.push(anime + ";" + (episode));
            }
            else {
                this_1.tvdb.getAirDate(this_1.components[anime]["tvdb"], (episode)).subscribe(function (airdate) { return newNames.push(anime + ";" + (episode) + ";" + _this.getTimer(airdate["_body"])); });
            }
        };
        var this_1 = this;
        for (var key in this.compNames) {
            _loop_1();
        }
        this.compNames = newNames;
    };
    loaderBlock.prototype.getTimer = function (string) {
        if (Date.parse(string) < -590114664000)
            return ("outOf " + string);
        var timeToAirms = (Date.parse(string) - Date.now());
        var timeToAir = Math.floor(timeToAirms / (1000 * 60 * 60 * 24));
        return (timeToAir + " days");
    };
    loaderBlock = __decorate([
        core_1.Component({
            selector: "loaderBlock",
            template: "<input type=submit (click)=\"addComponent()\" value=\"Create Tracker:\"/>\n  <select [(ngModel)]=\"compSelect\">\n    <option *ngFor=\"let component of compNames\" value={{component}}>{{component}}</option>\n  </select><br>\n  ",
        }), 
        __metadata('design:paramtypes', [])
    ], loaderBlock);
    return loaderBlock;
}());
exports.loaderBlock = loaderBlock;
//# sourceMappingURL=loaderBlock.component.js.map