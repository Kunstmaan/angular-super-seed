exports.config = {
    // The address of a running selenium server.
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'cucumber',
    allScriptsTimeout: 20000,
    specs: [
        'e2e/**/*.feature'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:9000',

    cucumberOpts: {
        require: ['test/e2e'],
        format: 'pretty',
        //tags: "@only"
    },
    onPrepare: function() {
        // Disable animations so e2e tests run more quickly
        var disableNgAnimate = function() {
            angular.module('disableNgAnimate', []).run(function($animate) {
                $animate.enabled(false);
            });
        };
        browser.addMockModule('disableNgAnimate', disableNgAnimate);
    }
}
