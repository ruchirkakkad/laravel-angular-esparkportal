'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
    ['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
)
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .otherwise('/access/signin');
            $stateProvider
                .state('access', {
                    abstract: true,
                    url: '/access',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                })
                .state('access.signin', {
                    url: '/signin',
                    controller: 'GuestCheckCtrl',
                    templateUrl: 'login',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/signin.js']);
                            }]
                    }
                })
                .state('access.signup', {
                    url: '/signup',
                    templateUrl: 'tpl/page_signup.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/signup.js']);
                            }]
                    }
                })
                .state('access.forgotpwd', {
                    url: '/forgotpwd',
                    templateUrl: 'tpl/page_forgotpwd.html'
                })
                .state('access.logout', {
                    url: '/logout',
                    //template: '<div ng-controller="logoutController" ></div>',
                    controller: function ($scope, $http, $state) {
                        $http.post('/logout', {}).success(function (data) {
                            $state.go('access.signin');
                        }, function (x) {
                        });
                    }
                })
                .state('access.404', {
                    url: '/404',
                    templateUrl: 'tpl/page_404.html'
                })
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: 'appView'
                })
                .state('app.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'dashboard',
                    controller: "AuthCheckCtrl"
                })
                .state('app.modules', {
                    url: '/modules',
                    template: '<div ui-view class="fade-in-up"></div>'
                })
                .state('app.modules.index', {
                    url: '/index',
                    templateUrl: 'modules/index',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/module-store.js']);
                            }]
                    }
                })
                .state('app.modules.create', {
                    url: '/create',
                    templateUrl: 'modules/create',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/module-store.js']);
                            }]
                    }
                })
                .state('app.modules.edit', {
                    url: '/edit/{id}',
                    templateUrl: 'modules/edit',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/module-store.js']);
                            }]

                    }
                })
                .state('app.modules.delete', {
                    url: '/delete/{id}',
                    controller: function ($http, $state, $stateParams, Flash) {

                        $http.post('checkAuthentication', {})
                            .success(function (data) {
                                if (data == '0') {
                                    $state.go('access.signin');
                                }
                            }, function (x) {
                            });

                        $http.get('/modules/destroy/' + $stateParams.id)
                            .success(function (data) {
                                if (data.code == '200') {
                                    var message = '<strong>Delete!</strong> You successfully deleted the module.';
                                    Flash.create('success', message);
                                    $state.go('app.modules.index');
                                }
                                if (data.code == '403') {
                                    $state.go('app.modules.index');
                                }
                            });
                    }
                })
                .state('app.marketing_countries', {
                    url: '/marketing_countries',
                    template: '<div ui-view  ng-controller="MarketingCountriesController" class="fade-in-right-big"></div>'
                })
                .state('app.marketing_countries.index', {
                    url: '/index',
                    templateUrl: 'marketing_countries/index-view',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/marketing_countries.js']);
                            }]
                    }
                })
                .state('app.marketing_countries.create', {
                    url: '/create',
                    templateUrl: 'marketing_countries/create-add',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/marketing_countries.js']);
                            }]
                    }
                })
                .state('app.marketing_countries.edit', {
                    url: '/edit/{id}',
                    templateUrl: 'marketing_countries/edit-edit',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/marketing_countries.js']);
                            }]

                    }
                })
                .state('app.marketing_countries.delete', {
                    url: '/delete/{id}',
                    controller: function ($http, $state, $stateParams, Flash) {

                        $http.post('checkAuthentication', {})
                            .success(function (data) {
                                if (data == '0') {
                                    $state.go('access.signin');
                                }
                            }, function (x) {
                            });

                        $http.get('/marketing_countries/destroy-delete/' + $stateParams.id)
                            .success(function (data) {
                                if (data.code == '200') {
                                    Flash.create('success', data.msg);
                                    $state.go('app.marketing_countries.index');
                                }
                                if (data.code == '403') {
                                    Flash.create('danger', data.msg);
                                    $state.go('app.marketing_countries.index');
                                }
                            });
                    }
                })
                .state('app.timezones', {
                    url: '/timezones',
                    template: '<div ui-view  ng-controller="TimezonesController" class="fade-in-right-big"></div>'
                })
                .state('app.timezones.index', {
                    url: '/index',
                    templateUrl: 'timezones/index-view',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/timezones.js']);
                            }]
                    }
                })
                .state('app.timezones.create', {
                    url: '/create',
                    templateUrl: 'timezones/create-add',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/timezones.js']);
                            }]
                    }
                })
                .state('app.timezones.edit', {
                    url: '/edit/{id}',
                    templateUrl: 'timezones/edit-edit',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/timezones.js']);
                            }]

                    }
                })
                .state('app.timezones.delete', {
                    url: '/delete/{id}',
                    controller: function ($http, $state, $stateParams, Flash) {

                        $http.post('checkAuthentication', {})
                            .success(function (data) {
                                if (data == '0') {
                                    $state.go('access.signin');
                                }
                            }, function (x) {
                            });

                        $http.get('/timezones/destroy-delete/' + $stateParams.id)
                            .success(function (data) {
                                if (data.code == '200') {
                                    Flash.create('success', data.msg);
                                    $state.go('app.timezones.index');
                                }
                                if (data.code == '403') {
                                    Flash.create('danger', data.msg);
                                    $state.go('app.timezones.index');
                                }
                            });
                    }
                })
                .state('app.leads_statuses', {
                    url: '/leads_statuses',
                    template: '<div ui-view  ng-controller="LeadStatusesController" class="fade-in-right-big"></div>'
                })
                .state('app.leads_statuses.index', {
                    url: '/index',
                    templateUrl: 'leads_statuses/index-view',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/leads_statuses.js']);
                            }]
                    }
                })
                .state('app.leads_statuses.create', {
                    url: '/create',
                    templateUrl: 'leads_statuses/create-add',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/leads_statuses.js']);
                            }]
                    }
                })
                .state('app.leads_statuses.edit', {
                    url: '/edit/{id}',
                    templateUrl: 'leads_statuses/edit-edit',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/leads_statuses.js']);
                            }]
                    }
                })
                .state('app.leads_statuses.delete', {
                    url: '/delete/{id}',
                    controller: function ($http, $state, $stateParams, Flash) {

                        $http.post('checkAuthentication', {})
                            .success(function (data) {
                                if (data == '0') {
                                    $state.go('access.signin');
                                }
                            }, function (x) {
                            });

                        $http.get('/leads_statuses/destroy-delete/' + $stateParams.id)
                            .success(function (data) {
                                if (data.code == '200') {
                                    Flash.create('success', data.msg);
                                    $state.go('app.leads_statuses.index');
                                }
                                if (data.code == '403') {
                                    Flash.create('danger', data.msg);
                                    $state.go('app.leads_statuses.index');
                                }
                            });
                    }
                })
                .state('app.marketing_datas', {
                    url: '/marketing_datas',
                    template: '<div ui-view  ng-controller="MarketingDatasController" class="fade-in-right-big"></div>'
                })
                .state('app.marketing_datas.create-one-add', {
                    url: '/create-one',
                    templateUrl: 'marketing_datas/create-one-add',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/marketing_datas.js']);
                            }]
                    }
                })
                .state('app.marketing_datas.create-two-add', {
                    url: '/create-two-add/{id}',
                    templateUrl: 'marketing_datas/create-two-add',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/marketing_datas.js']);
                            }]
                    }
                })
                .state('app.marketing_datas.index-one-view', {
                    url: '/index-one-view',
                    templateUrl: 'marketing_datas/index-one-view',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/marketing_datas.js']);
                            }]
                    }
                })
                .state('app.marketing_datas.index-two-view', {
                    url: '/index-two-view/{id}',
                    templateUrl: 'marketing_datas/index-two-view',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/marketing_datas.js']);
                            }]
                    }
                })
                    .state('app.marketing_datas.index-three-view', {
                    url: '/index-three-view/{id}',
                    templateUrl: 'marketing_datas/index-three-view',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                   files: [
                                        //'../../../assets/global/plugins/select2/select2.css',
                                        'vendor/datatables/plugins/bootstrap/dataTables.bootstrap.css',
                                        'vendor/datatables/extensions/Scroller/css/dataTables.scroller.min.css',
                                        'vendor/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css',

                                        //'../../../assets/global/plugins/select2/select2.min.js',
                                        'vendor/datatable.js',
                                        'vendor/datatables/jquery.dataTables.columnFilter.min.js',
                                        'vendor/datatables/all.min.js',

                                        'js/controllers/marketing_datas.js'
                                    ]
                                });
                            }]
                    }
                })
                .state('app.sheets.country-sheets', {
                    url: '/country-sheets/{id}',
                    templateUrl: 'sheets/country-sheets',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/sheets.js']);
                            }]

                    }
                })
                .state('app.sheets.create', {
                    url: '/create',
                    templateUrl: 'sheets/create-add',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/sheets.js']);
                            }]
                    }
                })
                .state('app.sheets.edit', {
                    url: '/edit/{id}',
                    templateUrl: 'sheets/edit-edit',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/sheets.js']);
                            }]

                    }
                })
                .state('app.sheets.delete', {
                    url: '/delete/{id}',
                    controller: function ($http, $state, $stateParams, Flash) {

                        $http.post('checkAuthentication', {})
                            .success(function (data) {
                                if (data == '0') {
                                    $state.go('access.signin');
                                }
                            }, function (x) {
                            });

                        $http.get('/sheets/destroy-delete/' + $stateParams.id)
                            .success(function (data) {
                                if (data.code == '200') {
                                    Flash.create('success', data.msg);
                                    $state.go('app.sheets.index');
                                }
                                if (data.code == '403') {
                                    Flash.create('danger', data.msg);
                                    $state.go('app.sheets.index');
                                }
                            });
                    }
                })
                .state('app.marketing_categories', {
                    url: '/marketing_categories',
                    template: '<div ui-view  ng-controller="MarketingCategoriesController" class="fade-in-right-big"></div>'
                })
                .state('app.marketing_categories.index', {
                    url: '/index',
                    templateUrl: 'marketing_categories/index-view',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/marketing_categories.js']);
                            }]
                    }
                })
                .state('app.marketing_categories.create', {
                    url: '/create',
                    templateUrl: 'marketing_categories/create-add',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/marketing_categories.js']);
                            }]
                    }
                })
                .state('app.marketing_categories.edit', {
                    url: '/edit/{id}',
                    templateUrl: 'marketing_categories/edit-edit',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/marketing_categories.js']);
                            }]

                    }
                })
                .state('app.marketing_categories.delete', {
                    url: '/delete/{id}',
                    controller: function ($http, $state, $stateParams, Flash) {

                        $http.post('checkAuthentication', {})
                            .success(function (data) {
                                if (data == '0') {
                                    $state.go('access.signin');
                                }
                            }, function (x) {
                            });

                        $http.get('/marketing_categories/destroy-delete/' + $stateParams.id)
                            .success(function (data) {
                                if (data.code == '200') {
                                    Flash.create('success', data.msg);
                                    $state.go('app.marketing_categories.index');
                                }
                                if (data.code == '403') {
                                    Flash.create('danger', data.msg);
                                    $state.go('app.marketing_categories.index');
                                }
                            });
                    }
                })
                .state('app.marketing_states', {
                    url: '/marketing_states',
                    template: '<div ui-view  ng-controller="MarketingStatesController" class="fade-in-right-big"></div>'
                })
                .state('app.marketing_states.index', {
                    url: '/index',
                    templateUrl: 'marketing_states/index-view',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/marketing_states.js']);
                            }]
                    }
                })
                .state('app.marketing_states.create', {
                    url: '/create',
                    templateUrl: 'marketing_states/create-add',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/marketing_states.js']);
                            }]
                    }
                })
                .state('app.marketing_states.edit', {
                    url: '/edit/{id}',
                    templateUrl: 'marketing_states/edit-edit',
                    controller: "AuthCheckCtrl",
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/marketing_states.js']);
                            }]

                    }
                })
                .state('app.marketing_states.delete', {
                    url: '/delete/{id}',
                    controller: function ($http, $state, $stateParams, Flash) {

                        $http.post('checkAuthentication', {})
                            .success(function (data) {
                                if (data == '0') {
                                    $state.go('access.signin');
                                }
                            }, function (x) {
                            });

                        $http.get('/marketing_states/destroy-delete/' + $stateParams.id)
                            .success(function (data) {
                                if (data.code == '200') {
                                    Flash.create('success', data.msg);
                                    $state.go('app.marketing_states.index');
                                }
                                if (data.code == '403') {
                                    Flash.create('danger', data.msg);
                                    $state.go('app.marketing_states.index');
                                }
                            });
                    }
                })
                .state('app.user', {
                    url: '/user',
                    templateUrl: 'app/user'
                })
                .state('app.ui', {
                    url: '/ui',
                    template: '<div ui-view class="fade-in-up"></div>'
                })
                .state('app.ui.buttons', {
                    url: '/buttons',
                    templateUrl: 'tpl/ui_buttons.html'
                })
                .state('app.ui.icons', {
                    url: '/icons',
                    templateUrl: 'tpl/ui_icons.html'
                })
                .state('app.ui.grid', {
                    url: '/grid',
                    templateUrl: 'tpl/ui_grid.html'
                })
                .state('app.ui.widgets', {
                    url: '/widgets',
                    templateUrl: 'tpl/ui_widgets.html'
                })
                .state('app.ui.bootstrap', {
                    url: '/bootstrap',
                    templateUrl: 'tpl/ui_bootstrap.html'
                })
                .state('app.ui.sortable', {
                    url: '/sortable',
                    templateUrl: 'tpl/ui_sortable.html'
                })
                .state('app.ui.portlet', {
                    url: '/portlet',
                    templateUrl: 'tpl/ui_portlet.html'
                })
                .state('app.ui.timeline', {
                    url: '/timeline',
                    templateUrl: 'tpl/ui_timeline.html'
                })
                .state('app.ui.tree', {
                    url: '/tree',
                    templateUrl: 'tpl/ui_tree.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                    function () {
                                        return $ocLazyLoad.load('js/controllers/tree.js');
                                    }
                                );
                            }
                        ]
                    }
                })
                .state('app.ui.toaster', {
                    url: '/toaster',
                    templateUrl: 'tpl/ui_toaster.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('toaster').then(
                                    function () {
                                        return $ocLazyLoad.load('js/controllers/toaster.js');
                                    }
                                );
                            }]
                    }
                })
                .state('app.ui.jvectormap', {
                    url: '/jvectormap',
                    templateUrl: 'tpl/ui_jvectormap.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('js/controllers/vectormap.js');
                            }]
                    }
                })
                .state('app.ui.googlemap', {
                    url: '/googlemap',
                    templateUrl: 'tpl/ui_googlemap.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load([
                                    'js/app/map/load-google-maps.js',
                                    'js/app/map/ui-map.js',
                                    'js/app/map/map.js']).then(
                                    function () {
                                        return loadGoogleMaps();
                                    }
                                );
                            }]
                    }
                })
                .state('app.chart', {
                    url: '/chart',
                    templateUrl: 'tpl/ui_chart.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load('js/controllers/chart.js');
                            }]
                    }
                })
                // table
                .state('app.table', {
                    url: '/table',
                    template: '<div ui-view></div>'
                })
                .state('app.table.static', {
                    url: '/static',
                    templateUrl: 'tpl/table_static.html'
                })
                .state('app.table.datatable', {
                    url: '/datatable',
                    templateUrl: 'tpl/table_datatable.html'
                })
                .state('app.table.footable', {
                    url: '/footable',
                    templateUrl: 'tpl/table_footable.html'
                })
                .state('app.table.grid', {
                    url: '/grid',
                    templateUrl: 'tpl/table_grid.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('ngGrid').then(
                                    function () {
                                        return $ocLazyLoad.load('js/controllers/grid.js');
                                    }
                                );
                            }]
                    }
                })
                // form
                .state('app.form', {
                    url: '/form',
                    template: '<div ui-view class="fade-in"></div>',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load('js/controllers/form.js');
                            }]
                    }
                })
                .state('app.form.elements', {
                    url: '/elements',
                    templateUrl: 'tpl/form_elements.html'
                })
                .state('app.form.validation', {
                    url: '/validation',
                    templateUrl: 'tpl/form_validation.html'
                })
                .state('app.form.wizard', {
                    url: '/wizard',
                    templateUrl: 'tpl/form_wizard.html'
                })
                .state('app.form.fileupload', {
                    url: '/fileupload',
                    templateUrl: 'tpl/form_fileupload.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('angularFileUpload').then(
                                    function () {
                                        return $ocLazyLoad.load('js/controllers/file-upload.js');
                                    }
                                );
                            }]
                    }
                })
                .state('app.form.imagecrop', {
                    url: '/imagecrop',
                    templateUrl: 'tpl/form_imagecrop.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('ngImgCrop').then(
                                    function () {
                                        return $ocLazyLoad.load('js/controllers/imgcrop.js');
                                    }
                                );
                            }]
                    }
                })
                .state('app.form.select', {
                    url: '/select',
                    templateUrl: 'tpl/form_select.html',
                    controller: 'SelectCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('ui.select').then(
                                    function () {
                                        return $ocLazyLoad.load('js/controllers/select.js');
                                    }
                                );
                            }]
                    }
                })
                .state('app.form.slider', {
                    url: '/slider',
                    templateUrl: 'tpl/form_slider.html',
                    controller: 'SliderCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('vr.directives.slider').then(
                                    function () {
                                        return $ocLazyLoad.load('js/controllers/slider.js');
                                    }
                                );
                            }]
                    }
                })
                .state('app.form.editor', {
                    url: '/editor',
                    templateUrl: 'tpl/form_editor.html',
                    controller: 'EditorCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('textAngular').then(
                                    function () {
                                        return $ocLazyLoad.load('js/controllers/editor.js');
                                    }
                                );
                            }]
                    }
                })
                // pages
                .state('app.page', {
                    url: '/page',
                    template: '<div ui-view class="fade-in-down"></div>'
                })
                .state('app.page.profile', {
                    url: '/profile',
                    templateUrl: 'tpl/page_profile.html'
                })
                .state('app.page.post', {
                    url: '/post',
                    templateUrl: 'tpl/page_post.html'
                })
                .state('app.page.search', {
                    url: '/search',
                    templateUrl: 'tpl/page_search.html'
                })
                .state('app.page.invoice', {
                    url: '/invoice',
                    templateUrl: 'tpl/page_invoice.html'
                })
                .state('app.page.price', {
                    url: '/price',
                    templateUrl: 'tpl/page_price.html'
                })
                .state('app.docs', {
                    url: '/docs',
                    templateUrl: 'tpl/docs.html'
                })
                // others
                .state('lockme', {
                    url: '/lockme',
                    templateUrl: 'tpl/page_lockme.html'
                })


                // fullCalendar
                .state('app.calendar', {
                    url: '/calendar',
                    templateUrl: 'tpl/app_calendar.html',
                    // use resolve to load other dependences
                    resolve: {
                        deps: ['$ocLazyLoad', 'uiLoad',
                            function ($ocLazyLoad, uiLoad) {
                                return uiLoad.load(
                                    ['vendor/jquery/fullcalendar/fullcalendar.css',
                                        'vendor/jquery/fullcalendar/theme.css',
                                        'vendor/jquery/jquery-ui-1.10.3.custom.min.js',
                                        'vendor/libs/moment.min.js',
                                        'vendor/jquery/fullcalendar/fullcalendar.min.js',
                                        'js/app/calendar/calendar.js']
                                ).then(
                                    function () {
                                        return $ocLazyLoad.load('ui.calendar');
                                    }
                                )
                            }]
                    }
                })

                // mail
                .state('app.mail', {
                    abstract: true,
                    url: '/mail',
                    templateUrl: 'tpl/mail.html',
                    // use resolve to load other dependences
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/app/mail/mail.js',
                                    'js/app/mail/mail-service.js',
                                    'vendor/libs/moment.min.js']);
                            }]
                    }
                })
                .state('app.mail.list', {
                    url: '/inbox/{fold}',
                    templateUrl: 'tpl/mail.list.html'
                })
                .state('app.mail.detail', {
                    url: '/{mailId}',
                    templateUrl: 'tpl/mail.detail.html'
                })
                .state('app.mail.compose', {
                    url: '/compose',
                    templateUrl: 'tpl/mail.new.html'
                })

                .state('layout', {
                    abstract: true,
                    url: '/layout',
                    templateUrl: 'tpl/layout.html'
                })
                .state('layout.fullwidth', {
                    url: '/fullwidth',
                    views: {
                        '': {
                            templateUrl: 'tpl/layout_fullwidth.html'
                        },
                        'footer': {
                            templateUrl: 'tpl/layout_footer_fullwidth.html'
                        }
                    },
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/vectormap.js']);
                            }]
                    }
                })
                .state('layout.mobile', {
                    url: '/mobile',
                    views: {
                        '': {
                            templateUrl: 'tpl/layout_mobile.html'
                        },
                        'footer': {
                            templateUrl: 'tpl/layout_footer_mobile.html'
                        }
                    }
                })
                .state('layout.app', {
                    url: '/app',
                    views: {
                        '': {
                            templateUrl: 'tpl/layout_app.html'
                        },
                        'footer': {
                            templateUrl: 'tpl/layout_footer_fullwidth.html'
                        }
                    },
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/controllers/tab.js']);
                            }]
                    }
                })
                .state('apps', {
                    abstract: true,
                    url: '/apps',
                    templateUrl: 'tpl/layout.html'
                })
                .state('apps.note', {
                    url: '/note',
                    templateUrl: 'tpl/apps_note.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/app/note/note.js',
                                    'vendor/libs/moment.min.js']);
                            }]
                    }
                })
                .state('apps.contact', {
                    url: '/contact',
                    templateUrl: 'tpl/apps_contact.html',
                    resolve: {
                        deps: ['uiLoad',
                            function (uiLoad) {
                                return uiLoad.load(['js/app/contact/contact.js']);
                            }]
                    }
                })
                .state('app.weather', {
                    url: '/weather',
                    templateUrl: 'tpl/apps_weather.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(
                                    {
                                        name: 'angular-skycons',
                                        files: ['js/app/weather/skycons.js',
                                            'vendor/libs/moment.min.js',
                                            'js/app/weather/angular-skycons.js',
                                            'js/app/weather/ctrl.js']
                                    }
                                );
                            }]
                    }
                })
                .state('music', {
                    url: '/music',
                    templateUrl: 'tpl/music.html',
                    controller: 'MusicCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'com.2fdevs.videogular',
                                    'com.2fdevs.videogular.plugins.controls',
                                    'com.2fdevs.videogular.plugins.overlayplay',
                                    'com.2fdevs.videogular.plugins.poster',
                                    'com.2fdevs.videogular.plugins.buffering',
                                    'js/app/music/ctrl.js',
                                    'js/app/music/theme.css'
                                ]);
                            }]
                    }
                })
                .state('music.home', {
                    url: '/home',
                    templateUrl: 'tpl/music.home.html'
                })
                .state('music.genres', {
                    url: '/genres',
                    templateUrl: 'tpl/music.genres.html'
                })
                .state('music.detail', {
                    url: '/detail',
                    templateUrl: 'tpl/music.detail.html'
                })
                .state('music.mtv', {
                    url: '/mtv',
                    templateUrl: 'tpl/music.mtv.html'
                })
                .state('music.mtvdetail', {
                    url: '/mtvdetail',
                    templateUrl: 'tpl/music.mtv.detail.html'
                })
                .state('music.playlist', {
                    url: '/playlist/{fold}',
                    templateUrl: 'tpl/music.playlist.html'
                })
        }
    ]
);