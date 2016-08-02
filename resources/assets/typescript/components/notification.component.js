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
var router_deprecated_1 = require('@angular/router-deprecated');
var notification_service_1 = require('./../services/notification.service');
var NotificationsComponent = (function () {
    function NotificationsComponent(_notifications) {
        var _this = this;
        this._notifications = _notifications;
        this._notes = new Array();
        _notifications.noteAdded.subscribe(function (note) {
            _this._notes.push(note);
            setTimeout(function () { _this.hide.bind(_this)(note); }, 5000);
        });
    }
    NotificationsComponent.prototype.hide = function (note) {
        var index = this._notes.indexOf(note);
        if (index >= 0) {
            this._notes.splice(index, 1);
        }
    };
    NotificationsComponent = __decorate([
        core_1.Component({
            selector: 'notifications',
            directives: [router_deprecated_1.RouterLink],
            templateUrl: '../templates/notification.component.html'
        }), 
        __metadata('design:paramtypes', [notification_service_1.NotificationsService])
    ], NotificationsComponent);
    return NotificationsComponent;
}());
exports.NotificationsComponent = NotificationsComponent;
//# sourceMappingURL=notification.component.js.map