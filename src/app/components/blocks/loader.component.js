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
var calendar_component_1 = require('./calendar.component');
var seriesTracker_component_1 = require('./seriesTracker.component');
var firebase_service_1 = require('../firebase.service');
var LoaderBlockComponent = (function () {
    function LoaderBlockComponent(dbHandle) {
        this.dbHandle = dbHandle;
        this.components = { 'calendar': calendar_component_1.CalendarComponent };
        this.compNames = Object.keys(this.components);
        console.log("Created LoaderBlockComponent");
        dbHandle.getAnimes(this, this.compNames);
    }
    LoaderBlockComponent.prototype.ngOnDestroy = function () {
        console.log("Destroied LoaderBlockComponent");
    };
    LoaderBlockComponent.prototype.addComponent = function () {
        var component = (this.components[this.compSelect]) ? this.components[this.compSelect] : seriesTracker_component_1.seriesTracker;
        seriesTracker_component_1.seriesTracker.prototype.name = this.compSelect;
        this.directory.loadComponentsFromType(component);
    };
    LoaderBlockComponent = __decorate([
        core_1.Component({
            selector: "loaderBlock",
            template: "<input type=submit (click)=\"addComponent()\" value=\"Create\"/>\n  <select [(ngModel)]=\"compSelect\">\n    <option *ngFor=\"let component of compNames\" value={{component}}>{{component}}</option>\n  </select><br>\n  ",
        }), 
        __metadata('design:paramtypes', [firebase_service_1.FirebaseService])
    ], LoaderBlockComponent);
    return LoaderBlockComponent;
}());
exports.LoaderBlockComponent = LoaderBlockComponent;
//# sourceMappingURL=loader.component.js.map