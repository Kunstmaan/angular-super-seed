'use strict';
// ci:coverage:exclude

/**
 * Add this mixin in a state if you want $state and $stateparams to be published.
 */
angular.module('app.common')
    .factory('stateMixin', ['$state', '$stateParams', function($state, $stateParams) {

        return function($scope) {
            $scope.$state = $state;
            $scope.$stateParams = $stateParams;
        };

    }]);

