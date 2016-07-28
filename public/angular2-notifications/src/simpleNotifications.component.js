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
var core_1 = require("@angular/core");
var notifications_service_1 = require("./notifications.service");
var notification_component_1 = require("./notification.component");
var SimpleNotificationsComponent = (function () {
    function SimpleNotificationsComponent(_service) {
        this._service = _service;
        this.notifications = [];
        // Received values
        this.lastOnBottom = true;
        this.maxStack = 8;
        this.preventLastDuplicates = false;
        this.preventDuplicates = false;
        // Sent values
        this.timeOut = 0;
        this.maxLength = 0;
        this.clickToClose = true;
        this.showProgressBar = true;
        this.pauseOnHover = true;
        this.rtl = false;
        // Outputs
        this.onCreate = new core_1.EventEmitter();
        this.onDestroy = new core_1.EventEmitter();
    }
    SimpleNotificationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Listen for changes in the service
        this.listener = this._service.getChangeEmitter()
            .subscribe(function (item) {
            switch (item.command) {
                case "cleanAll":
                    _this.notifications = [];
                    break;
                case "clean":
                    _this.cleanSingle(item.id);
                    break;
                case "set":
                    if (item.add)
                        _this.add(item.notification);
                    else
                        _this.defaultBehavior(item);
                    break;
                default:
                    _this.defaultBehavior(item);
                    break;
            }
        });
        this.attachChanges();
    };
    // Default behavior on event
    SimpleNotificationsComponent.prototype.defaultBehavior = function (value) {
        this.notifications.splice(this.notifications.indexOf(value.notification), 1);
        this.onDestroy.emit(this.buildEmit(value.notification, false));
    };
    // Add the new notification to the notification array
    SimpleNotificationsComponent.prototype.add = function (item) {
        item.createdOn = new Date();
        item.id = Math.random().toString(36).substring(3);
        var toBlock = this.preventLastDuplicates || this.preventDuplicates ? this.block(item) : false;
        // Save this as the last created notification
        this.lastNotificationCreated = item;
        if (!toBlock) {
            // Check if the notification should be added at the start or the end of the array
            if (this.lastOnBottom) {
                if (this.notifications.length >= this.maxStack)
                    this.notifications.splice(0, 1);
                this.notifications.push(item);
            }
            else {
                if (this.notifications.length >= this.maxStack)
                    this.notifications.splice(this.notifications.length - 1, 1);
                this.notifications.splice(0, 0, item);
            }
            this.onCreate.emit(this.buildEmit(item, true));
        }
    };
    // Check if notifications should be prevented
    SimpleNotificationsComponent.prototype.block = function (item) {
        var toCheck = item.html ? checkHtml : checkStandard;
        if (this.preventDuplicates && this.notifications.length > 0)
            for (var i = 0; i < this.notifications.length; i++)
                if (toCheck(this.notifications[i]))
                    return true;
        if (this.preventLastDuplicates) {
            var comp = void 0;
            if (this.preventLastDuplicates === "visible" && this.notifications.length > 0) {
                if (this.lastOnBottom)
                    comp = this.notifications[this.notifications.length - 1];
                else
                    comp = this.notifications[0];
            }
            else if (this.preventLastDuplicates === "all" && this.lastNotificationCreated)
                comp = this.lastNotificationCreated;
            else
                return false;
            return toCheck(comp);
        }
        return false;
        function checkHtml(checker) {
            return checker.html ? checker.type === item.type && checker.title === item.title && checker.content === item.content && checker.html === item.html : false;
        }
        function checkStandard(checker) {
            return checker.type === item.type && checker.title === item.title && checker.content === item.content;
        }
    };
    // Attach all the changes received in the options object
    SimpleNotificationsComponent.prototype.attachChanges = function () {
        var _this = this;
        Object.keys(this.options).forEach(function (a) { return _this[a] = _this.options[a]; });
    };
    SimpleNotificationsComponent.prototype.buildEmit = function (notification, to) {
        var toEmit = {
            createdOn: notification.createdOn,
            type: notification.type,
            id: notification.id
        };
        if (notification.html)
            toEmit["html"] = notification.html;
        else {
            toEmit["title"] = notification.title;
            toEmit["content"] = notification.content;
        }
        if (!to)
            toEmit["destroyedOn"] = new Date();
        return toEmit;
    };
    SimpleNotificationsComponent.prototype.cleanSingle = function (id) {
        var indexOfDelete, doDelete = false;
        this.notifications.forEach(function (a, idx) {
            if (a.id === id) {
                indexOfDelete = idx;
                doDelete = true;
            }
        });
        if (doDelete)
            this.notifications.splice(indexOfDelete, 1);
    };
    SimpleNotificationsComponent.prototype.ngOnDestroy = function () { if (this.listener)
        this.listener.unsubscribe(); };
    SimpleNotificationsComponent = __decorate([
        core_1.Component({
            selector: "simple-notifications",
            directives: [notification_component_1.NotificationComponent],
            inputs: ["options"],
            outputs: ["onCreate", "onDestroy"],
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n        <div class=\"simple-notification-wrapper\">\n            <simple-notification\n                *ngFor=\"let a of notifications; let i = index\"\n                [item]=\"a\"\n                [timeOut]=\"timeOut\"\n                [clickToClose]=\"clickToClose\"\n                [maxLength]=\"maxLength\"\n                [showProgressBar]=\"showProgressBar\"\n                [pauseOnHover]=\"pauseOnHover\"\n                [theClass]=\"theClass\"\n                [rtl]=\"rtl\"\n                [position]=\"i\">\n            </simple-notification>\n        </div>\n    ",
            styles: ["\n        .simple-notification-wrapper {\n            position: fixed;\n            bottom: 20px;\n            right: 20px;\n            width: 300px;\n            z-index: 1000;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [notifications_service_1.NotificationsService])
    ], SimpleNotificationsComponent);
    return SimpleNotificationsComponent;
}());
exports.SimpleNotificationsComponent = SimpleNotificationsComponent;
//# sourceMappingURL=simpleNotifications.component.js.map