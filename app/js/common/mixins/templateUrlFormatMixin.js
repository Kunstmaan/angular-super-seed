'use strict';
// ci:coverage:exclude

angular.module('app.common')
    .factory('templateUrlFormatMixin', ['template', function(template) {

        return function($scope) {
            $scope.templateUrl = template.formatUrl;
        };
    }]);
