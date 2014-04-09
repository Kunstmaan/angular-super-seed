(function(plugin){
    if (
        typeof require === "function" &&
            typeof exports === "object" &&
            typeof module === "object"
        ) {
        // NodeJS
        module.exports = plugin;
    } else if (
        typeof define === "function" &&
            define.amd
        ) {
        // AMD
        define(function () {
            return plugin;
        });
    } else {
        // Other environment (usually <script> tag): plug in to global chai instance directly.
        chai.use(plugin);
    }
}(function(chai, utils){
    chai.datetime = chai.datetime || {};

    chai.datetime.formatDate = function(date) {
        return date.toDateString();
    };

    chai.datetime.formatTime = function(time) {
        return time;
    };

    chai.datetime.equalTime = function(actual, expected) {
        return actual.getTime() == expected.getTime();
    };

    chai.datetime.equalDate = function(actual, expected) {
        return actual.toDateString() === expected.toDateString();
    };

    chai.datetime.beforeDate = function(actual, expected) {
        return actual.getUTCFullYear() < expected.getUTCFullYear() || actual.getUTCMonth() < expected.getUTCMonth() || actual.getUTCDate() < expected.getUTCDate();
    };

    chai.datetime.afterDate = function(actual, expected) {
        return actual.getUTCFullYear() > expected.getUTCFullYear() || actual.getUTCMonth() > expected.getUTCMonth() || actual.getUTCDate() > expected.getUTCDate();
    };

    chai.datetime.beforeTime = function(actual, expected) {
        return actual.getTime() < expected.getTime();
    };

    chai.datetime.afterTime = function(actual, expected) {
        return actual.getTime() > expected.getTime();
    };

    chai.Assertion.addChainableMethod('equalTime', function(expected) {
        var actual = this._obj;

        return this.assert(
            chai.datetime.equalTime(expected, actual),
            'expected ' + this._obj + ' to equal ' + expected,
            'expected ' + this._obj + ' to not equal ' + expected
        );
    });

    chai.Assertion.addChainableMethod('equalDate', function(expected) {
        var expectedDate  = chai.datetime.formatDate(expected),
            actualDate    = chai.datetime.formatDate(this._obj);

        return this.assert(
            chai.datetime.equalDate(this._obj, expected),
            'expected ' + actualDate + ' to equal ' + expectedDate,
            'expected ' + actualDate + ' to not equal ' + expectedDate
        );
    });

    chai.Assertion.addChainableMethod('beforeDate', function(expected) {
        var actual = this._obj;

        this.assert(
            chai.datetime.beforeDate(actual, expected),
            'expected ' + chai.datetime.formatDate(actual) + ' to be before ' + chai.datetime.formatDate(expected),
            'expected ' + chai.datetime.formatDate(actual) + ' not to be before ' + chai.datetime.formatDate(expected)
        );
    });

    chai.Assertion.addChainableMethod('afterDate', function(expected) {
        var actual = this._obj;

        this.assert(
            chai.datetime.afterDate(actual, expected),
            'expected ' + chai.datetime.formatDate(actual) + ' to be after ' + chai.datetime.formatDate(expected),
            'expected ' + chai.datetime.formatDate(actual) + ' not to be after ' + chai.datetime.formatDate(expected)
        );
    });

    chai.Assertion.addChainableMethod('beforeTime', function(expected) {
        var actual = this._obj;

        this.assert(
            chai.datetime.beforeTime(actual, expected),
            'expected ' + chai.datetime.formatTime(actual) + ' to be before ' + chai.datetime.formatTime(expected),
            'expected ' + chai.datetime.formatTime(actual) + ' not to be before ' + chai.datetime.formatTime(expected)
        );
    });

    chai.Assertion.addChainableMethod('afterTime', function(expected) {
        var actual = this._obj;

        this.assert(
            chai.datetime.afterTime(actual, expected),
            'expected ' + chai.datetime.formatTime(actual) + ' to be after ' + chai.datetime.formatTime(expected),
            'expected ' + chai.datetime.formatTime(actual) + ' not to be after ' + chai.datetime.formatTime(expected)
        );
    });

    // Asserts
    var assert = chai.assert;

    assert.equalDate = function(val, exp, msg) {
        new chai.Assertion(val, msg).to.be.equalDate(exp);
    };

    assert.notEqualDate = function(val, exp, msg) {
        new chai.Assertion(val, msg).to.not.be.equalDate(exp);
    };

    assert.beforeDate = function(val, exp, msg) {
        new chai.Assertion(val, msg).to.be.beforeDate(exp);
    };

    assert.notBeforeDate = function(val, exp, msg) {
        new chai.Assertion(val, msg).to.not.be.beforeDate(exp);
    };

    assert.afterDate = function(val, exp, msg) {
        new chai.Assertion(val, msg).to.be.afterDate(exp);
    };

    assert.notAfterDate = function(val, exp, msg) {
        new chai.Assertion(val, msg).not.to.be.afterDate(exp);
    };

    assert.equalTime = function(val, exp, msg) {
        new chai.Assertion(val, msg).to.be.equalTime(exp);
    };

    assert.notEqualTime = function(val, exp, msg) {
        new chai.Assertion(val, msg).to.not.be.equalTime(exp);
    };

    assert.beforeTime = function(val, exp, msg) {
        new chai.Assertion(val, msg).to.be.beforeTime(exp);
    };

    assert.notBeforeTime = function(val, exp, msg) {
        new chai.Assertion(val, msg).not.to.be.beforeTime(exp);
    };

    assert.afterTime = function(val, exp, msg) {
        new chai.Assertion(val, msg).to.be.afterTime(exp);
    };

    assert.notAfterTime = function(val, exp, msg) {
        new chai.Assertion(val, msg).to.not.be.afterTime(exp);
    };

}));