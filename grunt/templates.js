var _    = require('lodash'),
    path = require('path');

module.exports = function(grunt, config, paths) {

    config['ngtemplates'] = {
        'testing': {
            cwd: paths['app_js'],
            src: '**/views/**/**.html',
            dest: 'test/helpers/templates.cached.js',
            options: {
                module: 'app.templates',
                prefix: '/js/',
                standalone: true
            }
        },
        'build': {
            cwd: paths['app_js'],
            src: '**/views/**/**.html',
            dest: paths['tmp_js'] + 'templates.js',
            options: {
                prefix: '/js/',
                module : 'app',
                concatfix: 'dist/js/app.js', // used by templatesconcatfix task
                htmlmin: {
                    collapseBooleanAttributes:      false,
                    collapseWhitespace:             false,
                    removeAttributeQuotes:          false,
                    removeComments:                 true, // Only if you don't use comment directives!
                    removeEmptyAttributes:          false,
                    removeRedundantAttributes:      false,
                    removeScriptTypeAttributes:     true,
                    removeStyleLinkTypeAttributes:  true
                }
            }
        }
    };

    grunt.registerTask('templatesconcatfix', 'Fix to ensure template file is concatted', function() {
        // get build config
        var ngtemplateConfig = grunt.config('ngtemplates').build;

        // add this file to be uglified (saves a bit space)
        var uglifyConfig = grunt.config('uglify');
        var genUglifyConfig = uglifyConfig.generated;
        var uglifyFile = '.tmp/uglify/js/templates.js';
        genUglifyConfig.files.push({src : [ ngtemplateConfig.dest], dest: uglifyFile});
        // write this config back
        grunt.config('uglify', uglifyConfig);

        // now take the output of uglify and add it to the concat
        var concatConfig = grunt.config('concat');
        var generatedConcat = concatConfig.generated;
        for (var i = 0 ; i < generatedConcat.files.length ; i++) {
            var f = generatedConcat.files[i];
            if (f.dest === ngtemplateConfig.options.concatfix) {
                f.src.push(uglifyFile);
                // write new concat confi
                grunt.config('concat', concatConfig);
                // we're done!
                grunt.log.ok('Added ' + uglifyFile + ' to be concatted to ' + ngtemplateConfig.options.concatfix);
                break;
            }
        }

    });

    config['watch'] = _.extend({}, config['watch'], {
        templates: {
            files: [paths['app_js'] + '**/*.html'],
            tasks: ['modernizr', 'ngtemplates:testing'],
            options: {
                nospawn: true,
                livereload: true
            }
        }
    });

};
