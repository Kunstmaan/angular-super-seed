'use strict';

app.helpers.disableModernizr = function() {
    window.Modernizr = {
        mq : function() {
            return true;
        }
    };
};

