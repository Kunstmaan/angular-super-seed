'use strict';

var _ = require('lodash');

module.exports = function(grunt, paths) {

    grunt.registerTask('kuma:e2eStateConfig', 'Generate a state configuration to be read by the e2e integration tests', function() {
        var stateFiles = grunt.file.expand({}, paths['app_js'] + '*/config/states.json'), states = {};
        for (var i = 0; i < stateFiles.length; i++) {
            _.merge(states, {states: grunt.file.readJSON(stateFiles[i])});
        }

        var outputFile = paths['test_e2e'] + '/common/states.generated.json',
            content = JSON.stringify(states, null, 4);

        grunt.file.write(outputFile, content);
        grunt.log.ok('Generated ' + outputFile);
    });

};