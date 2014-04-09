var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var util = require("./util.js");
var pageConfirm = require("./common.page.js");


/**
 * Util functions to check for links / click on links / going to states.
 */
module.exports = function() {

    this.Given(/^I am on state "([^"]*)"\s*(\(.*\))?$/, function(state, regexp, next) {
        if (regexp && regexp.length > 2) {
            regexp = regexp.substr(1, regexp.length - 2); // strip ( ... )
        }
        util.goToState(state, regexp).then(function() {
            next();
        });
    });

    this.When(/^I click(\son)?\sthe link "([^"]*)"$/, function(optParam,linkName,next) {
        element(by.linkText(linkName)).click();
        next();
    });

    this.When(/^I click(\son)?\sthe button "([^"]*)"$/, function(optParam,linkName,next) {
        element(by.buttonText(linkName)).click();
        next();
    });

    this.When(/^I enter "([^"]*)" into "([^"]*)\s\((.*)\)"$/, function(text,name,identifier,next) {
        element(util.locateBy(identifier)).sendKeys(text);
        next();
    });

    this.When(/^I clear "([^"]*)\s\((.*)\)"$/, function(name, identifier, next) {
        element(util.locateBy(identifier)).clear();
        next();
    });

    this.When(/^I select "([^"]*)" from the dropdown "([^"]*)"$/, function(selectValue, dropdownIdentifier, next) {
        var found = false;
        var foundOption;
        element(util.locateBy(dropdownIdentifier)).element.all(by.tagName("option")).then(function(arr) {
            arr.some(function(option) {
                option.getText().then(function(value) {
                    if (value === selectValue) {
                        found = true;
                        foundOption = option;
                    }
                });
            });
        }).then(function() {
            expect(found).to.be.true;
            foundOption.click();
            next();
        });
    });
    ;
    this.Then(/^I should see the link "([^"]*)"$/, function(linkName, next) {
        expect(element(by.linkText(linkName)).isDisplayed()).to.eventually.equal(true);
        next();
    });

    this.Then(/^I should see the button "([^"]*)"$/, function(linkName, next) {
        expect(element(by.buttonText(linkName)).isDisplayed()).to.eventually.equal(true);
        next();
    });

    this.Then(/^the "([^"]*)" button should be enabled$/, function(name,next) {
        expect(element(by.buttonText(name)).isEnabled()).to.eventually.equal(true);
        next();
    });

};

