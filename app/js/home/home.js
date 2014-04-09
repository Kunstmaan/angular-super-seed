'use strict';

angular.module('app.home')
    .config(['featuresResolverProvider', function(featuresResolverProvider) {
        featuresResolverProvider.localFeatures.push('Unit and e2e testing preconfigured');
    }]);
