'use strict';

var _ = require('lodash'),
    path = require('path'),
    fs = require('fs');

module.exports = function(grunt, paths) {

    grunt.registerTask('kuma:config', 'Generate a configuration based on the current ENVIRONMENT', function(envTarget) {
        var env = envTarget || grunt.config('env');

        grunt.log.subhead('Generating config file for the ' + env + ' environment!');

        var files = grunt.file.expand(paths['app_js'] + '*');

        var config = {}, states = {};
        _.forEach(files, function(dir) {
            var module = path.basename(dir),
                configFile = path.resolve(dir, 'config', 'config.json'),
                stateFile = path.resolve(dir, 'config', 'states.json');

            if (fs.existsSync(configFile)) {
                _.merge(config, grunt.file.readJSON(configFile));
            }

            if (fs.existsSync(stateFile)) {
                _.merge(states, {states: _.mapValues(grunt.file.readJSON(stateFile), function(state) {
                    return _.extend({
                        'module': module
                    }, state);
                })});
            }

        });

        config = _.merge({}, states, config, grunt.file.readJSON(paths['app_config'] + 'config.json'), grunt.file.readJSON(paths['app_config'] + 'config_' + env + '.json'));

        var outputFile = paths['app_js'] + 'common/config/config.js',
            content = "'use strict';\n" +
                       "// ci:coverage:exclude\n\n" +
                       "angular.module('app.common')\n" +
                       "    .constant('config', " + JSON.stringify(config, null, 4) + ");";

        grunt.file.write(outputFile, content);
        grunt.log.ok('Generated ' + outputFile);
    });

};
