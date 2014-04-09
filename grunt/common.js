
module.exports = function(grunt, config, paths) {

    config['clean'] = {
        build: {
            files: [{
                dot: true,
                src: [
                    paths['tmp'],
                    paths['build'] + '*'
                ]
            }]
        },
        dev: {
            files: [{
                dot: true,
                src: [
                    paths['tmp']
                ]
            }]
        }
    };

};