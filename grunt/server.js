var http = require('http'),
    path = require('path');

var LIVERELOAD_PORT = 35729,
    lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT }),
    mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

module.exports = function(grunt, config, paths) {

    config['reload'] = {
        port: LIVERELOAD_PORT
    };

    config['connect'] =  {
        options: {
            port: 9000,
            hostname: '*'
        },
        app: {
            options: {
                middleware: function (connect) {
                    var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                    return [
                        lrSnippet,
                        mountFolder(connect, paths['tmp']),
                        mountFolder(connect, paths['app']),
                        proxy
                    ];
                }
            }
        }
    };

    config['open'] = {
        server: {
            url: 'http://localhost:<%= connect.options.port %>'
        }
    };

};
