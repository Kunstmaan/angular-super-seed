/**
 * Utils that can be used in every def.js file.
 * Just import them using node's require syntax.
 */

var states = require("./states.generated.json").states;
module.exports = {};

module.exports.waitOnUrl = function(urlRegexp) {
    return browser.wait(function() {
        return browser.getCurrentUrl().then(function(url) {
            return urlRegexp.test(url);
        });
    }, 5000, 'Taking too long waiting on URL');
};

module.exports.locateBy = function(identifier) {
    var locator;
    if (identifier.indexOf("#") === 0) {
        // is an id
        locator = by.id(identifier.substring(1)); // remove # sign
    } else if (identifier.indexOf(".") === 0) {
        locator = by.class(identifier.substring(1)); // remove . sign
    } else {
        // is a model
        locator = by.model(identifier);
    }
    return locator;
};

module.exports.escapeRegExp = function (str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};

/**
 * Move to a specific state.
 *
 * @param state string is the full name of the state.
 * @param regexp RegEx is optional.
 */
module.exports.goToState = function(state, regexp) {
    if (!states[state]) {
        throw new Error("State '" + state + "' not found.");
    }
    var url = "#" + states[state].path;
    browser.get(url);
    var r = new RegExp(module.exports.escapeRegExp(url) + "$");
    if (regexp) {
        r = new RegExp(regexp);
    }
    return module.exports.waitOnUrl(r);
}

