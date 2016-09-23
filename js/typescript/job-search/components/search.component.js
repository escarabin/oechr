System.register(['@angular/core', '@angular/router', './../../services/user.service', './../../services/notification.service', './../../models/notification'], function(exports_1, context_1) {
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
    var core_1, router_1, user_service_1, notification_service_1, notification_1;
    var SearchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (notification_service_1_1) {
                notification_service_1 = notification_service_1_1;
            },
            function (notification_1_1) {
                notification_1 = notification_1_1;
            }],
        execute: function() {
            SearchComponent = (function () {
                function SearchComponent(route, router, userService, notificationService) {
                    var _this = this;
                    this.route = route;
                    this.router = router;
                    this.userService = userService;
                    this.notificationService = notificationService;
                    this.searchParameters = [];
                    this.routeSegments = [];
                    this.userService.getUserInfos().subscribe(function (res) {
                        if (res.text().length > 10) {
                            _this.user = res.json();
                        }
                        else {
                            /**
                             * If user is not logged in, show sign-up notification
                             */
                            _this.notificationService.show(new notification_1.Notification('info', 'Pour postuler à nos offres', '/sign-up', 'Inscrivez-vous', false));
                        }
                    });
                    route.params.subscribe(function (params) {
                        if (params) {
                            _this.placeId = params['placeId'];
                            _this.jobNamingId = parseInt(params['jobNamingId']);
                            _this.contractTypeId = parseInt(params['contractTypeId']);
                            _this.studyLevelId = parseInt(params['studyLevelId']);
                        }
                    });
                    /**
                     * Subscribe to route change to display components regarding current route
                     * (ex: Home page is different and does not show child component 'profile-sub-header')
                     */
                    router.events.subscribe(function (event) {
                        var segments = event.url.split('/');
                        var link = "/";
                        for (var i = 1; i < segments.length; i++) {
                            link += segments[i] + "/";
                            /**
                             * Avoid appending ids (numbers) to route segments
                             */
                            if (isNaN(segments[i])) {
                                _this.routeSegments.push({ title: segments[i], link: link });
                            }
                        }
                    });
                }
                /**
                 * Event fired on page scroll to adapt visual elements
                 * @param event
                 */
                SearchComponent.prototype.onPageScroll = function (event) {
                    this.scrollTop = event.target['scrollingElement']['scrollTop'];
                };
                SearchComponent = __decorate([
                    core_1.Component({
                        templateUrl: '../templates/search.component.html',
                        providers: [user_service_1.UserService],
                        selector: 'search',
                    }), 
                    __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, user_service_1.UserService, notification_service_1.NotificationsService])
                ], SearchComponent);
                return SearchComponent;
            }());
            exports_1("SearchComponent", SearchComponent);
        }
    }
});
