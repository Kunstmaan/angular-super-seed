var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var _ = require('lodash');
chai.use(chaiAsPromised);
var expect = chai.expect;

module.exports = function() {

    this.Then(/^I should see the feature "([^"]*)"$/, function(feature, next) {
        expect(element(by.repeater('feature in features')).getText()).to.eventually.contain(feature);
        next();
    });

};

