(function(homeModule) {
    'use strict';
    // ci:coverage:exclude

    var HomeCtrl = (function () {

        function HomeCtrl(config, features) {
            this.env = config.env;
            this.features = features;
        };

        HomeCtrl.prototype.alertMe = function(feature) {
            alert(feature + '!');
        };

        HomeCtrl.$inject = ['config', 'features'];

        return HomeCtrl;

    })();

    homeModule.controller('HomeCtrl', HomeCtrl);

})(angular.module('app.home'));
