'use strict';

/**
 * Define all the modules and their dependencies here ... config/run phase is done in the <module_name>/<module_name>.js file.
 */
angular.module('app.common', []);
angular.module('app.home', ['ui.router']);

angular.module('app', ['app.home', 'app.common', 'ngSanitize', 'ngAnimate', 'ui.router', 'svgPng'])
    .value('version', '0.1')
    .config(['config', '$httpProvider', '$stateProvider', '$urlRouterProvider', 'template',
        function(config, $httpProvider, $stateProvider, $urlRouterProvider, template) {
            var _states = config['states'], _defaultPath = '/',
                _registerState = function(name, stateConfig) {

                    var resolve = {}, options, locals;

                    // extension for our resolvers functionality
                    if (typeof stateConfig.resolve !== 'undefined') {
                        angular.forEach(stateConfig.resolve, function(value, key) {
                            var resolveFn;

                            // by default if only a string is given it will inject,
                            // else if an object is given without inject property or the inject property is set to false
                            // it will return the value property of the object
                            if (typeof value === 'string' || (value.hasOwnProperty('inject') && value.inject === true)) {
                                resolveFn = ['$injector', '$stateParams', function($injector, $stateParams) {
                                    return $injector.get(value)($stateParams);
                                }];
                            } else {
                                resolveFn = function() {
                                    return value['value'];
                                };
                            }

                            resolve[key] = resolveFn;
                        });
                    }

                    options = {
                        'stateName': name,
                        'templateUrl': template.formatUrl(stateConfig.templateUrl, stateConfig.module),
                        'url': stateConfig.path,
                        'abstract': typeof stateConfig['abstract'] !== 'undefined' && stateConfig['abstract'] ? true : false,
                        'strict': false,
                        'resolve': resolve
                    };

                    // extension that will apply the mixins to the controller scope
                    if (angular.isDefined(stateConfig.controller)) {
                        locals = ['$scope', '$controller', 'mixins', '$stateParams'].concat(_.keys(resolve));
                        options.controller = locals.concat(function($scope, $controller, mixins) {
                            var i = 0, localsObj = {};

                            for (;i < locals.length; i++) {
                                localsObj[locals[i]] = arguments[i];
                            }

                            if (angular.isArray(stateConfig.mixins)) {
                                mixins($scope, stateConfig.mixins);
                            }

                            $controller(stateConfig.controller, localsObj);
                        });
                    }

                    // If views are defined pass them along as default in the UI-Router,
                    // except also add the default templateUrl & controller as the logic
                    // to be placed in the parent's unnamed ui-view.
                    if (typeof stateConfig.views !== 'undefined') {
                        var views = {
                            '': {
                                'templateUrl': options.templateUrl,
                                'controller': options.controller
                            }
                        };
                        delete(options.controller);
                        delete(options.templateUrl);

                        angular.forEach(stateConfig.views, function(view) {
                            view.templateUrl = template.formatUrl(view.templateUrl, stateConfig.module);
                        });
                        views = angular.extend(views, stateConfig.views);
                        options.views = views;
                    }

                    $stateProvider.state(name, options);
                };

            angular.forEach(_states, function(state, stateName) {
                if (state['default']) {
                    _defaultPath = state.path;
                }

                _registerState(stateName, state);
            });

            // Redirect all urls not associated to a recognized state to the root URL.
            $urlRouterProvider
                .otherwise(_defaultPath);

        }])
    .run(['$rootScope', 'mixins',
        function($rootScope, mixins) {

            mixins($rootScope, 'templateUrlFormat');

        }]);

