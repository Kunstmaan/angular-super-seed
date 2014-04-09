'use strict';

var _ = require('lodash');

module.exports = function(grunt) {

    grunt.registerTask('regaction', function(target) {

        var defaults = {
            regex_modifier: 'igm'
        };

        var config = grunt.config(this.name)[target];

        // Override defaults with environment specific options and possible arguments.
        // When an argument is undefined it wont override previously defined values.
        var options = _.defaults(config, defaults);
        grunt.log.debug('options', options);

        if (typeof options.action !== 'function' || _.isEmpty(options.regex) || _.isEmpty(options.files)) {
            grunt.log.error('regaction:' + target + ' is configured incorrectly. Please provide an action, a regex and files.');
            return;
        }

        var expandedFiles = [];
        _.forEach(options.files, function(file) {
            expandedFiles = expandedFiles.concat(grunt.file.expand(file));
        });

        var regex = new RegExp(options.regex, options.regex_modifier);
        var matchedFiles = _.filter(expandedFiles, function(file) {
            return grunt.file.read(file).match(regex);
        });

        var ignoredFiles = _.difference(expandedFiles, matchedFiles);

        config.action(matchedFiles, ignoredFiles);
    });

};
