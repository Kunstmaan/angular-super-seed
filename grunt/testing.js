var _ = require('lodash');

module.exports = function(grunt, config, paths) {
    config['karma'] = {
        options: {
            files: [
                './test/mocha.conf.js',

                //App-specific Code
                './test/helpers/templates.cached.js',
                './app/js/app.js',
                './app/js/*/*/**/*.js',

                //Test-Specific Code
                './test/lib/chai-should.js',
                './test/lib/chai-expect.js',
                './test/lib/chai-datetime.js',
                './node_modules/sinon-chai/lib/sinon-chai.js',
                './test/lib/sinon.js',
                './test/helpers/helpers.js',
                './test/helpers/**/*.js',

                //extra testing code
                './app/bower_vendor/angular-mocks/angular-mocks.js',
                './test/lib/browserTrigger.js',

                //test files
                './test/unit/**/*.js'
            ],
            browsers: ['Chrome']
        },
        default: {
            configFile: paths['test'] + 'karma-unit.conf.js',
            port: 9876,
            runnerPort: 9100,
            singleRun: true,
            reporters: ['osx', 'spec']
        },
        coverage: {
            configFile: paths['test'] + 'karma-unit.conf.js',
            port: 9876,
            runnerPort: 9100,
            singleRun: true,
            reporters: ['osx', 'spec', 'coverage'],
            coverageReporter: {
                type : 'html',
                dir : './build/js/',
                file: 'coverage-unit-test.html'
            }
        },
        watch: {
            configFile: paths['test'] + 'karma-unit.conf.js',
            port: 9876,
            runnerPort: 9100,
            background: true,
            reporters: ['osx', 'spec'],
            browsers: ['PhantomJS']
        },
        ci: {
            configFile: paths['test'] + 'karma-unit.conf.js',
            port: 9876,
            runnerPort: 9100,
            singleRun: true,
            browsers: ['PhantomJS', 'Chrome'],
            reporters: ['dots', 'coverage', 'junit'],
            coverageReporter: {
                type : 'cobertura',
                dir : './build/js/',
                file: 'coverage-unit-test.xml'
            },
            junitReporter: {
                outputFile: './build/js/junit-unit-test.xml'
            }
        }
    };

    config['regaction'] = {
        coverage: {
            files: [paths['app_js'] + '**/*.js'],
            regex: '.*\/\/.*(ci:coverage:exclude).*',
            action: function(matchedFiles, ignoredfiles) {
                var cmds = [config.karma.ci, config.karma.coverage];
                _.each(cmds, function(cmd) { cmd.preprocessors = {}; });

                grunt.log.write('coverage: ignored', matchedFiles.length, 'files.');
                grunt.log.debug('coverage: ignored files: ', matchedFiles);

                var i;
                for (i=0; i<ignoredfiles.length;i++) {
                    _.each(cmds, function(cmd) {
                        cmd.preprocessors[ignoredfiles[i]] = ['coverage'];
                    });
                }
            }
        }
    };

    config['watch'] = _.extend({}, config['watch'], {
        tests: {
            files: [paths['test'] + 'unit/**/*.js', paths['test'] + 'helpers/**/*.js'],
            tasks: ['karma:watch:run'],
            options: {
                event: ['added', 'changed'],
                interrupt: true,
                livereload: true
            }
        }
    });

    // to get this going, run the following command : ./node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update
    config['protractor'] = {
        ci: {
            configFile : 'test/e2e.conf.js'
        },
        dev: {
            options : {
                configFile: 'test/e2e.conf.js',
                args: {
                    chromeOnly: true
                }
            }
        }
    };

};
