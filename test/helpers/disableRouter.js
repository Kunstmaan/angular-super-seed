'use strict';

/**
 * If you don't want to start triggering statechanges when you click things call this function in your tests.
 */
app.helpers.disableRouter = function($provide) {
    $provide.decorator('$state', function($delegate) {
        $delegate.transitionTo = function(to) {};
        return $delegate;
    });
};

