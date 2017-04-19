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
var loader_component_1 = require('./blocks/loader.component');
var cards_component_1 = require('./blocks/cards.component');
console.log(JSON.stringify(cards_component_1.CardsComponent.prototype));
var ComponentDirectory = (function () {
    function ComponentDirectory(compiler) {
        this.compiler = compiler;
        this.components = {};
        this.factories = {};
        this.DoneLoading_ = false;
        this.LoadingEvent_ = new core_1.EventEmitter(); //not ment for this? Hey, it works!
        this.loadComponentsFromType(loader_component_1.LoaderBlockComponent);
    }
    ComponentDirectory.prototype.loadComponentsFromModule = function (Module) {
        var _this = this;
        this.DoneLoading_ = false;
        this.compiler_ = this.compiler.compileModuleAndAllComponentsAsync(Module);
        this.compiler_.then(function (data) {
            var componentFactories = data.componentFactories;
            for (var key in componentFactories) {
                var name_1 = componentFactories[key].selector;
                _this.factories[name_1] = componentFactories[key];
            }
            _this.DoneLoading_ = true;
            _this.LoadingEvent_.emit(Object.keys(_this.factories));
        });
    };
    ComponentDirectory.prototype.loadComponentsFromType = function (type) {
        type.prototype.directory = this;
        var DynamicModule = (function () {
            function DynamicModule() {
            }
            DynamicModule = __decorate([
                core_1.NgModule({
                    imports: [platform_browser_1.BrowserModule, forms_1.FormsModule],
                    declarations: [type],
                }), 
                __metadata('design:paramtypes', [])
            ], DynamicModule);
            return DynamicModule;
        }());
        this.loadComponentsFromModule(DynamicModule);
    };
    ComponentDirectory.prototype.loadComponentsFromObj = function (data) {
        var _DynamicComponent = (function () {
            function _DynamicComponent() {
            }
            _DynamicComponent.prototype.ngOnDestroy = function () {
                console.log("Destroied DynamicComponent");
            };
            _DynamicComponent = __decorate([
                core_1.Component({
                    selector: data.name,
                    template: data.html,
                }), 
                __metadata('design:paramtypes', [])
            ], _DynamicComponent);
            return _DynamicComponent;
        }());
        this.loadComponentsFromType(_DynamicComponent);
    };
    ComponentDirectory.prototype.getFactory = function (name) {
        var _this = this;
        // If factory exists give this;
        if (this.factories[name])
            return new Promise(function (resolve) {
                console.log("Promise was ready and returned straight away");
                resolve(_this.factories[name]);
            });
        //Palautetaan Promise compilaus eventtiin, toivotaan et sieltä tulee joskus
        return new Promise(function (resolve) {
            console.log("Promise was not ready and returned promise");
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
        __metadata('design:paramtypes', [compiler_1.JitCompiler])
    ], ComponentDirectory);
    return ComponentDirectory;
}());
exports.ComponentDirectory = ComponentDirectory;
//# sourceMappingURL=componentdirectory.provider.js.map