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
var componentdirectory_provider_1 = require('./components/componentdirectory.provider');
var Auth_service_1 = require('./Auth.service');
var BlockComponent = (function () {
    function BlockComponent(directory_, cdr, auth) {
        this.directory_ = directory_;
        this.cdr = cdr;
        this.auth = auth;
        this.components_ = [];
        this.show_ = {};
        this.float_ = {};
        this.admin = "google-oauth2|105691295982317741699";
        this.access = false;
    }
    BlockComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //Kun uusi componentti valmistuu katotaan oliks meillä se jo
        this.SyncComponents(this.directory_.getComponents());
        //Kirjaudutaan päivittämään komponentit aina kun directory sanoo hep
        this.directory_.LoadingEvent_.subscribe(function (components) {
            var newComps = [];
            for (var key in components) {
                if (_this.components_.indexOf(components[key]) == -1) {
                    newComps.push(components[key]);
                }
            }
            _this.SyncComponents(newComps);
            _this.cdr.detectChanges(); // update page
        });
        this.auth.onUser(this.admin, function (value) {
            _this.access = value;
            _this.cdr.detectChanges(); // update page
        });
    };
    BlockComponent.prototype.SyncComponents = function (comps) {
        this.components_.push.apply(this.components_, comps);
        this.nextFloat_ = "left";
        for (var component in this.components_) {
            this.show_[component] = false;
            this.float_[this.components_[component]] = this.nextFloat_;
            (this.nextFloat_ == "left") ? this.nextFloat_ = "right" :
                this.nextFloat_ = "left";
        }
        this.cdr.detectChanges(); // update page
    };
    BlockComponent.prototype.toggle = function (event) {
        this.show_[event] = !this.show_[event];
        this.cdr.detectChanges(); // update page
    };
    BlockComponent.prototype.delete = function (event) {
        this.show_[event] = false;
        var index = this.components_.indexOf(event);
        this.components_.splice(index, 1);
        this.SyncComponents([]);
        console.log(this.components_);
        this.cdr.detectChanges(); // update page
    };
    BlockComponent.prototype.refresh = function (blockName) {
        //Poistetaan vanha
        this.show_[blockName] = false;
        this.directory_.refreshComponent(blockName);
        this.cdr.detectChanges(); // update page
        //Avataan uusi !!!
        this.show_[blockName] = true;
        this.cdr.detectChanges(); // update page
    };
    BlockComponent = __decorate([
        core_1.Component({
            selector: 'block',
            templateUrl: '/app/blocks.html',
        }), 
        __metadata('design:paramtypes', [componentdirectory_provider_1.ComponentDirectory, core_1.ChangeDetectorRef, Auth_service_1.Auth])
    ], BlockComponent);
    return BlockComponent;
}());
exports.BlockComponent = BlockComponent;
var LoaderComponent = (function () {
    function LoaderComponent(componentFactoryResolver, directory_, ref) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.directory_ = directory_;
        this.ref = ref;
        this.loading_ = true;
    }
    LoaderComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.directory_.getFactory(this.component).then(function (factory) {
            var compRef = _this.conteiner_.createComponent(factory);
            compRef.changeDetectorRef.detectChanges();
        });
    };
    __decorate([
        core_1.ViewChild('here', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], LoaderComponent.prototype, "conteiner_", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LoaderComponent.prototype, "component", void 0);
    LoaderComponent = __decorate([
        core_1.Component({
            selector: 'loader',
            inputs: ['component'],
            template: "<template #here></template>",
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, componentdirectory_provider_1.ComponentDirectory, core_1.ViewContainerRef])
    ], LoaderComponent);
    return LoaderComponent;
}());
exports.LoaderComponent = LoaderComponent;
//# sourceMappingURL=block.component.js.map