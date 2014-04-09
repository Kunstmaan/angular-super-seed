'use strict';

/* jshint -W079 */ // Disable error redefinition of traderapp
var app = app || {};
/* jshint +W079 */
/**
 * Checks if something is defined and not null.
 *
 * @param value
 * @returns {boolean}
 */
app.isSet = function() {
    var i = 0, args = Array.prototype.slice.call(arguments);

    for (; i < args.length; i++) {
        if (angular.isUndefined(args[i]) || args[i] === null) {
            return false;
        }
    }

    return true;
};
