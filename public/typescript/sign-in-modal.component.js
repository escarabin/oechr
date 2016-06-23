System.register(['@angular/core', '@angular/common', 'ng2-bootstrap'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, ng2_bootstrap_1;
    var SignInModalComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            }],
        execute: function() {
            SignInModalComponent = (function () {
                function SignInModalComponent() {
                }
                SignInModalComponent = __decorate([
                    core_1.Component({
                        templateUrl: '../templates/sign-in-modal.component.html',
                        directives: [ng2_bootstrap_1.MODAL_DIRECTVES, common_1.CORE_DIRECTIVES],
                        viewProviders: [ng2_bootstrap_1.BS_VIEW_PROVIDERS],
                        selector: 'sign-in-modal',
                    }), 
                    __metadata('design:paramtypes', [])
                ], SignInModalComponent);
                return SignInModalComponent;
            }());
            exports_1("SignInModalComponent", SignInModalComponent);
        }
    }
});
