'use strict';
// ci:coverage:exclude

angular.module('app.home')
    .controller('HomeCtrl', ['$scope', 'config', 'features', function ($scope, config, features) {

        $scope.env = config.env;
        $scope.features = features;

    }]);

