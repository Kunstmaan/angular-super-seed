'use strict';

/**
 * @note
 *  first idea was to handle this at state and context configuration level, but resolve and so doesn't has the scope variable so it didn't work
 */
angular.module('app.common')
    .factory('mixins', ['$injector', function($injector) {

        return function($scope, mixins) {
            if (arguments.length <= 2) {
                if (!_.isArray(mixins)) {
                    mixins = [mixins];
                }
            } else {
                mixins = Array.prototype.slice.call(arguments, 1, arguments.length);
            }

            var i = 0;
            for (; i < mixins.length; i++) {
                (typeof mixins[i] === 'string' ? $injector.get(mixins[i] + (app.endsWith(mixins[i], 'Mixin') ? '' : 'Mixin')) : $injector.invoke(mixins[i]))($scope);
            }
        };

    }]);
