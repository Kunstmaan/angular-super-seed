'use strict';

/* jshint -W079 */ // Disable error redefinition of traderapp
var app = app || {};
/* jshint +W079 */

/**
 * Checks if a string ends with a certain substring
 *
 * @param str
 * @param ends
 * @returns {boolean}
 */
app.endsWith = function(str, ends){
    if (ends === '') {
        return true;
    }
    if (!app.isSet(str) || !app.isSet(ends)) {
        return false;
    }
    str = String(str); ends = String(ends);
    return str.length >= ends.length && str.slice(str.length - ends.length) === ends;
};