var _         = require('lodash'),
    uglifyNew = require('grunt-usemin-uglifynew');

module.exports = function(grunt, config, paths) {
    config['jshint'] = {
        options: {
            jshintrc: '.jshintrc',
            force: false,
            ignores : [
                paths['app_js'] + 'common/config/config.js'
            ]
        },
        default: [
            paths['app_js'] + '**/*.js'
        ],
        ci: {
            options: {
                reporter: 'checkstyle',
                reporterOutput: './build/js/checkstyle-jshint.xml',
                force: false
            },
            files: {
                src: [
                    paths['app_js'] + '**/*.js'
                ]
            }
        }
    };

    config['useminPrepare'] = {
        html: paths['tmp'] + 'index.html',
        options: {
            dest: paths['build'],
            root: paths['app'],
            flow: {
                steps: {
                    'js': [
                        {
                            name: 'karma',
                            createConfig: function(context) {
                                context.outFiles = context.inFiles;
                                context.outDir = context.inDir;

                                context.options.options = context.options.options || {};
                                context.options.options.files = (_.map(context.inFiles, function(value) {
                                        return context.inDir + value;
                                    })).concat(context.options.options.files || []);

                                return {};
                            }
                        },
                        uglifyNew, 'concat'
                    ]
                },
                post: {}
            }
        }
    };

    config['usemin'] = {
        html: paths['build'] + 'index.html',
        css: paths['build_css'] + '**/*.css',
        js: paths['build_js'] + '**/app*.js',
        options: {
            assetsDirs: [paths['build']],
            patterns: {
                js: [
                    [ /<img[^\>]+src=['"]([^"']+)["']/gm,
                    'Update the html images inside the ngTemplates'
                    ]
                ],
                css: [ // this is copied from the latest build of usemin
                    /*jshint regexp:false */
                    [ /(?:src=|url\(\s*)['"]?([^'"\)\?]+)['"]?\s*\)?/gm,
                        'Update the CSS to reference our revved images'
                    ]
                ]
            }
        }
    };

    config['fileblocks'] = {
        options: {
            removeFiles: true,
            cwd: paths['app']
        },
        app: {
            src: paths['tmp'] + 'index.html',
            blocks: {
                app: {
                    src: ['js/app.js', 'js/*/*/**/*.js', 'js/**/*.js']
                }
            }
        }
    };

    config['copy'] = _.extend({}, config['copy'], {
        html: {
            files: [{
                expand: true,
                dot: true,
                cwd: paths['app'],
                dest: paths['tmp'],
                src: [
                    'index.html'
                ]
            }]
        }
    });

    config['filerev'] = _.extend({}, config['filerev'], {
        javascript: {
            src: [
                paths['build_js'] + '*.js'
            ]
        }
    });

    config['watch'] = _.extend({}, config['watch'], {
        'scripts': {
            files: [paths['app_js'] + '**/*.js'],
            tasks: ['smart-modernizr', 'fileblocks:app', 'reload', 'jshint:default', 'karma:watch:run']
        },
        'vendors': {
            files: [paths['bower_vendors'] + '**/*.js', paths['vendors'] + '**/*.js'],
            tasks: ['reload']
        },
        'app_config': {
            files: [paths['app_config'] + '*.json', paths['app_js'] + '*/config/*.json'],
            tasks: ['kuma:config']
        }
    });

};

