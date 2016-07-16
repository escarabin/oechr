System.register(['@angular/core', '@angular/router-deprecated', './../services/job.service', './job-search-sidebar.component', './new-application-form.component'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, job_service_1, job_search_sidebar_component_1, new_application_form_component_1;
    var JobComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (job_service_1_1) {
                job_service_1 = job_service_1_1;
            },
            function (job_search_sidebar_component_1_1) {
                job_search_sidebar_component_1 = job_search_sidebar_component_1_1;
            },
            function (new_application_form_component_1_1) {
                new_application_form_component_1 = new_application_form_component_1_1;
            }],
        execute: function() {
            JobComponent = (function () {
                function JobComponent(routeParams, jobService) {
                    this.routeParams = routeParams;
                    this.jobService = jobService;
                    var __this = this;
                    this.user = JSON.parse(localStorage.getItem('user'));
                    this.jobId = routeParams.get("jobId");
                    jobService.getJob(__this.jobId).subscribe(function (res) {
                        __this.job = res.json();
                        console.log(__this.job);
                    });
                }
                JobComponent = __decorate([
                    core_1.Component({
                        providers: [job_service_1.JobService],
                        directives: [router_deprecated_1.RouterLink,
                            job_search_sidebar_component_1.JobSearchSidebarComponent,
                            new_application_form_component_1.NewApplicationFormComponent],
                        inputs: ['jobId'],
                        selector: 'job',
                        templateUrl: '../templates/job.component.html',
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof router_deprecated_1.RouteParams !== 'undefined' && router_deprecated_1.RouteParams) === 'function' && _a) || Object, job_service_1.JobService])
                ], JobComponent);
                return JobComponent;
                var _a;
            }());
            exports_1("JobComponent", JobComponent);
        }
    }
});
