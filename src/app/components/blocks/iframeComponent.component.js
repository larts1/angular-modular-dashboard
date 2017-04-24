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
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require('@angular/http');
var iframeComponent = (function () {
    function iframeComponent(domSanitizer, http) {
        this.domSanitizer = domSanitizer;
        this.http = http;
        this.selector = "iframeComponent";
        this.dbHandle = this.directory.firebaseService;
    }
    iframeComponent.prototype.ngOnInit = function () {
        this.url_ = this.domSanitizer.bypassSecurityTrustResourceUrl(this.address);
    };
    iframeComponent.prototype.onMessage = function (event) {
        console.log(event);
    };
    iframeComponent.prototype.ngAfterViewInit = function () { };
    __decorate([
        core_1.ViewChild('iframe'), 
        __metadata('design:type', core_1.ElementRef)
    ], iframeComponent.prototype, "iframe", void 0);
    iframeComponent = __decorate([
        core_1.Component({
            selector: "iframeComponent",
            template: "\n  <iframe #iframe [src]=url_ width=\"100%\" style=\"height: 50vw\"\n  (window:message)=\"onMessage($event)\"\n  sandbox=\"allow-same-origin allow-scripts\"></iframe>\n      ",
        }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizer, http_1.Http])
    ], iframeComponent);
    return iframeComponent;
}());
exports.iframeComponent = iframeComponent;
//# sourceMappingURL=iframeComponent.component.js.map