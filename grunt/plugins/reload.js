'use strict';

var http = require('http');

/**
 * Custom task to reload the web app. We created this one so that this could be done async while our tests are running.
 * @TODO: not sure we still need this
 */
module.exports = function(grunt) {

	grunt.registerTask('reload', function() { // task so that we can manually trigger reload and so that it happens async with other tasks @todo maybe check grunt concurrent
        var done = this.async(),
            config = grunt.config(this.name);

            console.log(config);

        var data = '{ "files": ["app.js"] }',
            req = http.request({
                'host': 'localhost',
                'port': config.port,
                'path': '/changed',
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': data.length
                }
            }, function(res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    grunt.log.debug('BODY: ' + chunk);
                });

                done();
            });

        req.on('error', function(e) {
            grunt.log.error('problem with request: ' + e.message);

            done();
        });

        req.end(data);
    });

};