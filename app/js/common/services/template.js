'use strict';

(function() {
    var PATTERN = /\.([0-9a-z]+)(?:[\?#]|$)/i;

    /**
     * Service that handles the dependencies for the templateUrlFormatter function.
     * The raw function should only be used in the common/common.js function to map the syayes in the config call.
     */
    angular.module('app.common')
        .constant('template', {
            'formatUrl': function(templateUrl, moduleName) {
                if (!templateUrl.match(PATTERN)) {
                    templateUrl += '.html';
                }

                return '/js/' + moduleName + '/views/' + templateUrl;
            }
        });

})();
