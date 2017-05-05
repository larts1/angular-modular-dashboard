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
var tvdbService = (function () {
    function tvdbService(http) {
        // this.headers = new Headers(
        //   { 'Content-Type': 'text/plain' });
        // this.options = new RequestOptions({ headers: this.headers });
        this.http = http;
        this.tvdbConfig = {
            apiKey: "F2023E1687010D5E",
        };
        // http.get("http://localhost:8888/token")
        //     .subscribe( (resp) => ( console.log("got it") )  );
    }
    tvdbService.prototype.getApiKey = function () {
    };
    tvdbService.prototype.bindAirDate = function (series, episode, target, elementName) {
        this.http.get("http://192.168.0.101:8888/airdate/" + series + "/" + episode)
            .subscribe(function (resp) { return (target[elementName] = resp["_body"]); });
    };
    tvdbService.prototype.getAirDate = function (series, episode, target, elementName) {
        return this.http.get("http://192.168.0.101:8888/airdate/" + series + "/" + episode);
    };
    tvdbService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], tvdbService);
    return tvdbService;
}());
exports.tvdbService = tvdbService;
//# sourceMappingURL=tvdb.service.js.map