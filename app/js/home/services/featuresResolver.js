'use strict';

angular.module('app.home')
    .provider('featuresResolver', function() {

        this.localFeatures = [];

        this.$get = ['config', function(config) {
            var _self = this;

            return function(/* $stateParams can be injected here */) {
                return config.features.concat(_self.localFeatures);
            };
        }];
    });
