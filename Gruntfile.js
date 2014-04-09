var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    timeGrunt = require('time-grunt');

var paths = {
    'app': 'app/',
    'app_js': 'app/js/',
    'app_scss': 'app/scss/',
    'app_img': 'app/img/',
    'app_fonts': 'app/fonts/',
    'app_config': 'app/config/',
    'bower_vendors': 'app/bower_vendor/',
    'vendors': 'app/vendor/',
    'test': 'test/',
    'test_unit': 'test/unit/',
    'test_e2e' : 'test/e2e',
    'build': 'dist/',
    'build_js': 'dist/js/',
    'build_css': 'dist/css/',
    'build_img': 'dist/img/',
    'build_fonts': 'dist/fonts/',
    'tmp': '.tmp/',
    'tmp_js': '.tmp/js/',
    'tmp_css': '.tmp/css/'
};

module.exports = function (grunt, config) {
    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times.
    // When running grunt--help this is a simple object. Not a function.
    // So it crashes with finding all the tasks.
    if (typeof timeGrunt === 'function') {
        timeGrunt(grunt);
    }

    config = {
        pkg: grunt.file.readJSON('package.json'),
        env: process.env['APP_ENV'] || 'dev',
        watch: {},
    };

    var configDir = './grunt';
    fs.readdirSync(configDir).forEach(function (file) {
        var filePath = path.resolve(configDir, file);

        if (!fs.statSync(filePath).isDirectory()){
            require(filePath)(grunt, config, paths);
        }
    });

    var pluginsDir = './grunt/plugins';
    fs.readdirSync(pluginsDir).forEach(function (file) {
        var filePath = path.resolve(pluginsDir, file);

        require(filePath)(grunt, paths);
    });

    grunt.initConfig(config);

    grunt.registerTask('test:default', [
        'kuma:config',
        'copy:html',
        'useminPrepare',
        'ngtemplates:testing',
        'jshint:default',
        'karma:default'
    ]);

    grunt.registerTask('test:ci', [
        'useminPrepare',
        'ngtemplates:testing',
        'regaction:coverage',
        'jshint:ci',
        'karma:ci'
    ]);

    grunt.registerTask('test:e2e', [
        'clean:dev',
        'smart-modernizr',
        'kuma:config',
        'kuma:e2eStateConfig',
        'copy:html',
        'configureProxies:app',
        'useminPrepare',
        'ngtemplates:testing',
        'fileblocks:app',
        'sass:app',
        'connect:app',
        'protractor:dev'
    ]);

    grunt.registerTask('build', [
        'clean:build',
        'smart-modernizr',
        'kuma:config',
        'copy:html',
        'fileblocks:app',
        'useminPrepare',
        'ngtemplates:build',
        'templatesconcatfix',
        'uglify',
        'concat',
        'sass:app',
        'copy:frontend',
        'filerev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'clean:dev',
        'smart-modernizr',
        'kuma:config',
        'copy:html',
        'useminPrepare',
        'ngtemplates:testing',
        'fileblocks:app',
        'karma:watch',
        'sass:app',
        'connect:app',
        'open',
        'watch'
    ]);
};
