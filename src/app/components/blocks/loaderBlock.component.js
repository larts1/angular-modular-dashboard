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
        this.compNames = Object.keys(this.components);
        console.log("Created LoaderBlockComponent");
        this.dbHandle = this.directory.firebaseService; //servicet otetaan directoryltä.
        this.dbHandle.getAnimes(this, this.compNames);
    }
    loaderBlock.prototype.ngOnDestroy = function () {
        console.log("Destroied LoaderBlockComponent");
    };
    loaderBlock.prototype.addComponent = function () {
        this.directory.loadComponent("seriesTracker", { "name": this.compSelect });
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