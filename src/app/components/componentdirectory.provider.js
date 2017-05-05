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
var compiler_1 = require('@angular/compiler');
var forms_1 = require('@angular/forms');
var platform_browser_1 = require('@angular/platform-browser');
var loaderBlock_component_1 = require('./blocks/loaderBlock.component');
var firebase_service_1 = require('./firebase.service');
var tvdb_service_1 = require('./tvdb.service');
var http_1 = require('@angular/http');
var DynamicModule = (function () {
    function DynamicModule() {
    }
    return DynamicModule;
}());
var sharedModule = (function () {
    function sharedModule() {
    }
    sharedModule = __decorate([
        core_1.NgModule({
            imports: [],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], sharedModule);
    return sharedModule;
}());
var ComponentDirectory = (function () {
    function ComponentDirectory(compiler, http, resolver) {
        this.compiler = compiler;
        this.http = http;
        this.resolver = resolver;
        this.components = {};
        this.factories = {};
        this.DoneLoading_ = false;
        this.LoadingEvent_ = new core_1.EventEmitter(); //not ment for this? Hey, it works!
        this.firebaseService = new firebase_service_1.FirebaseService();
        this.tvdbService = new tvdb_service_1.tvdbService(this.http);
        this.tabs = {};
        this.loadComponentsFromType(loaderBlock_component_1.loaderBlock);
        this.loadComponent("sleepTracker");
    }
    ComponentDirectory.prototype.refreshComponent = function (name) {
        //Poistetaan vanha factory heti, jottei enää anneta sitä vahingossa
        if (name in this.factories)
            delete this.factories[name];
        //asynctoottinen, jää kesken
        this.loadComponentsFromUrl("/app/components/blocks/" + name + ".component.js");
    };
    ComponentDirectory.prototype.loadComponent = function (name, opts) {
        if (opts === void 0) { opts = {}; }
        //Poistetaan vanha factory heti, jottei enää anneta sitä vahingossa
        if (name in this.factories)
            delete this.factories[name];
        //asynctoottinen, jää kesken
        this.loadComponentsFromUrl("/app/components/blocks/" + name + ".component.js", opts);
    };
    ComponentDirectory.prototype.loadComponentsFromUrl = function (url, opts) {
        var _this = this;
        if (opts === void 0) { opts = {}; }
        this.http.get(url).subscribe(function (x) { return _this.loadComponentsFromType(eval(x["_body"]), opts); });
    };
    ComponentDirectory.prototype.importType = function (caller, name) {
        this.http.get("/app/components/blocks/" + name + ".component.js")
            .subscribe(function (x) { return caller[name] = eval(x["_body"]); });
    };
    ComponentDirectory.prototype.loadComponentsFromModule = function (Module) {
        var _this = this;
        this.DoneLoading_ = false;
        this.compiler_ = this.compiler.compileModuleAndAllComponentsAsync(Module);
        this.compiler_.then(function (data) {
            var componentFactories = data.componentFactories;
            for (var key in componentFactories) {
                var name_1 = componentFactories[key].selector;
                _this.factories[name_1] = componentFactories[key];
                if (typeof componentFactories[key].componentType.prototype.tab === 'function') {
                    _this.tabs[componentFactories[key].componentType.prototype.tab()] = key;
                }
            }
            _this.DoneLoading_ = true;
            _this.LoadingEvent_.emit(Object.keys(_this.factories));
        });
    };
    ComponentDirectory.prototype.loadComponentsFromType = function (type, opts) {
        if (opts === void 0) { opts = {}; }
        type.prototype.directory = this;
        //Välitetään optsit uudelle luokalle
        for (var key in opts) {
            type.prototype[key] = opts[key];
        }
        var DynamicModule = (function () {
            function DynamicModule() {
            }
            DynamicModule = __decorate([
                core_1.NgModule({
                    imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, sharedModule],
                    declarations: [type]
                }), 
                __metadata('design:paramtypes', [])
            ], DynamicModule);
            return DynamicModule;
        }());
        this.loadComponentsFromModule(DynamicModule);
    };
    ComponentDirectory.prototype.getFactory = function (name) {
        var _this = this;
        // If factory exists give this;
        if (this.factories[name])
            return new Promise(function (resolve) {
                resolve(_this.factories[name]);
            });
        //Palautetaan Promise compilaus eventtiin, toivotaan et sieltä tulee joskus
        return new Promise(function (resolve) {
            _this.LoadingEvent_.subscribe(function () { return resolve(_this.factories[name]); });
        });
    };
    ComponentDirectory.prototype.getComponent = function (name) {
        return this.factories[name];
    };
    ComponentDirectory.prototype.getComponents = function () {
        return Object.keys(this.factories);
    };
    ComponentDirectory = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [compiler_1.JitCompiler, http_1.Http, core_1.ComponentFactoryResolver])
    ], ComponentDirectory);
    return ComponentDirectory;
}());
exports.ComponentDirectory = ComponentDirectory;
//# sourceMappingURL=componentdirectory.provider.js.map