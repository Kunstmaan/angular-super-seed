var _ = require('lodash');

module.exports = function(grunt, config, paths) {
    config['imagemin'] = {
        all: {
            options: {
                optimizationLevel: 3,
                progressive: true
            },
            files: [
                {
                    expand: true,
                    cwd: paths['app_img'],
                    src: '**/*.{png,jpg,jpeg,gif,webp}',
                    dest: paths['app_img']
                }
            ]
        }
    };

    config['sass'] = {
        app: {
            files: [{
                expand: true,
                cwd: paths['app_scss'],
                src: ['*.scss'],
                dest: paths['tmp_css'],
                ext: '.css',
                noCache: true
            }]
        }
    };

    config['copy'] = _.extend({}, config['copy'], {
        frontend: {
            files: [{
                expand: true,
                dot: true,
                cwd: paths['app'],
                dest: paths['build'],
                src: [
                    '*.{ico,png,txt}',
                    '.htaccess',
                    'img/{,*/}*',
                    'fonts/{,*/}*'
                ]
            }, {
                expand: true,
                dot: true,
                cwd: paths['tmp'],
                dest: paths['build'],
                src: [
                    'index.html'
                ]
            }, {
                expand: true,
                dot: true,
                cwd: paths['tmp_css'],
                dest: paths['build_css'],
                src: [
                    '*.css'
                ]
            }, {
                expand: true,
                dot: true,
                cwd: paths['tmp_js'],
                dest: paths['build_js'],
                src: [
                    'modernizr-custom.js'
                ]
            }]
        }
    });

    config['filerev'] = _.extend({}, config['filerev'], {
        css: {
            src: [
                paths['build_css'] + '*.css'
            ]
        },
        fonts: {
            src: [
                paths['build_fonts'] + '**/*.{svg,eot,otf,ttf,woff}'
            ]
        },
        images: {
            src: [
                paths['build_img'] + '**/*.{png,jpg,jpeg,gif,webp,svg}'
            ]
        }
    });

    config['svg2png'] = {
        all: {
            files: [
                {
                    src: paths['app_img'] + '**/*.svg'
                }
            ]
        }
    };

    config['modernizr'] = {
        devFile: 'remote',
        outputFile: paths['tmp_js'] + 'modernizr-custom.js.tmp',
        files: [paths['app_js'] + '**/*.js', paths['app_scss'] + '**/*.scss'],
        parseFiles: true,
        extra: {
        'shiv' : true,
            'printshiv' : false,
            'load' : true,
            'mq' : false,
            'cssclasses' : true
        },
        extensibility: {
            'addtest' : false,
                'prefixed' : false,
                'teststyles' : false,
                'testprops' : false,
                'testallprops' : false,
                'hasevents' : false,
                'prefixes' : false,
                'domprefixes' : false
        }
    };

    config['smart_copy'] = {
        'modernizr': {
            'src': paths['tmp_js'] + 'modernizr-custom.js.tmp',
            'dest': paths['tmp_js'] + 'modernizr-custom.js'
        }
    };

    grunt.registerTask('smart-modernizr', ['modernizr', 'smart_copy:modernizr']);

    config['watch'] = _.extend({}, config['watch'], {
        imagemin: {
            files: paths['app_img'] + '**/*.{png,jpg,jpeg,gif,webp}',
            tasks: ['imagemin'],
            options: {
                event: ['added', 'changed'],
                livereload: true
            }
        },
        svg2png: {
            files: paths['app_img'] + '**/*.svg',
            tasks: ['svg2png'],
            options: {
                event: ['added', 'changed'],
                livereload: true
            }
        },
        sass: {
            files: [paths['app_scss'] + '**/*.scss'],
            tasks: ['sass:app', 'smart-modernizr']
        },
        csslivereload: {
            files: [paths['tmp'] + 'js/modernizr-custom.js', paths['tmp_css'] + '*.css'],
            options: {
                livereload: true
            }
        },
        index: {
            files: [paths['app'] + 'index.html'],
            tasks: ['copy:html', 'useminPrepare', 'fileblocks:app'],
            options: {
                livereload: true
            }
        }
    });

};

