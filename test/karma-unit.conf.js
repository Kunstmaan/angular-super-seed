module.exports = function(config) {
    config.set({
        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-ng-scenario',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-osx-reporter',
            'karma-junit-reporter',
            'karma-coverage',
            'karma-spec-reporter'
        ],
        port: 9876,
        runnerPort: 9100, // cli runner port
        frameworks: ['mocha', 'chai'],
        basePath: '../',
        singleRun: false,           // if true, it capture browsers, run tests and exit
        captureTimeout: 5000,       // if browser does not capture in given timeout [ms], kill it
        autoWatch: false,           // enable / disable watching file and executing tests whenever any file changes
        colors: true,               // enable / disable colors in the output (reporters and logs)
        logLevel: config.LOG_DEBUG, // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        reporters: ['progress'],
        proxies: {
            '/': 'http://localhost:8000/'
        },
        preprocessors: {
            './app/js/**/*.js': 'coverage'
        },
        files: [],
        exclude: []
    });
};

