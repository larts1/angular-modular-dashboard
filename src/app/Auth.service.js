// app/auth.service.ts
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
var angular2_jwt_1 = require('angular2-jwt');
var lock = new Auth0Lock('DmLilnkuHKUpG24aLEaYjsZDXlW1Tt5j', 'lartsi.eu.auth0.com', {});
var Auth = (function () {
    function Auth() {
        // Configure Auth0
        this.onLogOut = [];
        // Add callback for lock `authenticated` event
        // Listening for the authenticated event
        lock.on("authenticated", function (authResult) {
            // Use the token in authResult to getUserInfo() and save it to localStorage
            lock.getUserInfo(authResult.accessToken, function (error, profile) {
                if (error) {
                    // Handle error
                    return;
                }
                localStorage.setItem('accessToken', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('profile', JSON.stringify(profile));
                // console.log(localStorage.gettItem('profile'));
            });
        });
    }
    Auth.prototype.onUser = function (id, doThis) {
        //rekisteröidään logout eventiksi
        this.onLogOut.push = doThis;
        if (this.authenticated()) {
            if (JSON.parse(localStorage.getItem("profile")).user_id == id)
                doThis(true);
            else
                doThis(false);
            return;
        }
        lock.on("authenticated", function (authResult) {
            lock.getUserInfo(authResult.accessToken, function (error, profile) {
                if (profile.user_id == id)
                    doThis(true);
                else
                    doThis(false);
            });
        });
    };
    Auth.prototype.login = function () {
        // Call the show method to display the widget.
        lock.show();
    };
    Auth.prototype.authenticated = function () {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        return angular2_jwt_1.tokenNotExpired();
    };
    Auth.prototype.logout = function () {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
        for (var key in this.onLogOut) {
            console.log("logged out and ran logout function");
            this.onLogOut[key](false);
        }
    };
    Auth = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Auth);
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=Auth.service.js.map