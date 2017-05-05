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
var FirebaseService = (function () {
    function FirebaseService() {
        this.firebaseConfig = {
            apiKey: "AIzaSyCAJZpfZCyrcnZwOPcP2zcrSCOG-rENpk4",
            authDomain: "lartsicontrol.firebaseapp.com",
            databaseURL: "https://lartsicontrol.firebaseio.com",
            storageBucket: "lartsicontrol.appspot.com",
            messagingSenderId: "515613322085"
        };
        firebase.initializeApp(this.firebaseConfig);
    }
    FirebaseService.prototype.bind = function (ref, element, url) {
        firebase.database().ref(url).once('value').then(function (snapshot) {
            ref[element] = snapshot.val();
        });
        firebase.database().ref(url).on('value', function (snapshot) {
            ref[element] = snapshot.val();
        });
    };
    FirebaseService.prototype.getEpisode = function (series) {
        return firebase.database().ref("/epTrack/" + series + "/episode");
    };
    FirebaseService.prototype.update = function (to, element) {
        firebase.database().ref(element).set(parseInt(to));
    };
    FirebaseService.prototype.play = function () {
        firebase.database().ref('/pause').set(true);
    };
    FirebaseService.prototype.pause = function () {
        firebase.database().ref('/pause').set(false);
    };
    FirebaseService.prototype.getAnimes = function (ref, element) {
        firebase.database().ref("/epTrack").on('value', function (snapshot) {
            element.length = 0;
            for (var key in snapshot.val()) {
                element.push(key);
            }
            ref.getDates();
        });
    };
    FirebaseService.prototype.getUrl = function (ref, element, name) {
        firebase.database().ref("/epTrack/" + name + "/url").on('value', function (snapshot) {
            console.log(snapshot.val());
            ref[element] = snapshot.val();
        });
    };
    FirebaseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FirebaseService);
    return FirebaseService;
}());
exports.FirebaseService = FirebaseService;
//# sourceMappingURL=firebase.service.js.map