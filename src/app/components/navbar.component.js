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
var componentdirectory_provider_1 = require('./componentdirectory.provider');
var NavBar = (function () {
    function NavBar(directory) {
        var _this = this;
        this.directory = directory;
        this.tabs = [];
        this.tabs = Object.keys(directory.tabs);
        directory.LoadingEvent_.subscribe(function (x) { _this.tabs = Object.keys(directory.tabs); console.log(_this.tabs); });
    }
    NavBar.prototype.close = function () {
        return true;
    };
    NavBar = __decorate([
        core_1.Component({
            selector: "navbar",
            template: "\n  <nav class=\"navbar navbar-inverse navbar-fixed-top\" onclick=\"exitFullscreen()\">\n  <div class=\"container-fluid\">\n\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" href=\"#\">Modular dashboard</a>\n    </div>\n\n    <div id=\"navbar\" class=\"navbar-collapse collapse\">\n\n      <ul class=\"nav navbar-nav navbar-left\" *ngFor=\"let tab of tabs\">\n          <li><a href=\"#\"> {{ tab }} </a></li>\n      </ul>\n\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li><a href=\"#\">Help</a></li>\n      </ul>\n\n      <form class=\"navbar-form navbar-right\">\n        <input name=\"componentName\" type=\"text\" class=\"form-control\" [(ngModel)]=\"compName\" placeholder=\"Create component\">\n        <input type=\"submit\" class=\"form-control\" value=\"Create\" (click)=\"create()\">\n      </form>\n\n      </div>\n    </div>\n\n  </nav>\n  "
        }), 
        __metadata('design:paramtypes', [componentdirectory_provider_1.ComponentDirectory])
    ], NavBar);
    return NavBar;
}());
exports.NavBar = NavBar;
//# sourceMappingURL=navbar.component.js.map