(function(app) {
    'use strict';

    function HomeCtrl($scope, config, features) {
        var vm = this;

        vm.env = config.env;
        vm.features = features;
    }

    HomeCtrl.prototype.alertMe = function (feature) {
        alert(feature + '!');
    }

    app.controller('HomeCtrl', ['$scope', 'config', 'features', HomeCtrl]);

})(angular.module('app.home'));