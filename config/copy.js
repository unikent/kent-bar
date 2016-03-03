var generateLocalSettings = function (content) {
    "use strict";
    var fs = require('fs'),
        settings = fs.readFile('local_env.json', 'utf8');
    return content.replace(/##local_settings##/g, '<script> window.KENT = { settings: ' + settings + '}; </script>');
};

var removePlaceholders = function (content) {
    "use strict";
    return content.replace(/##local_settings##/, '');
};

module.exports = {
    test: {
        files: [
            {
                src: 'src/test.html',
                dest: 'test/test.html'
            },
            {
                src: 'src/index.html',
                dest: 'build/test/index.html'
            },
            {
                src: 'src/boot.html',
                dest: 'build/test/boot.html'
            },
            {
                expand: true,
                cwd: 'src/public/',
                src: ['**'],
                dest: 'build/test/'
            }
        ],
        options: {
            process: generateLocalSettings
        }
    },
    dev: {
        files: [
            {
                src: 'src/index.html',
                dest: 'build/dev/index.html'
            },
            {
                src: 'src/boot.html',
                dest: 'build/dev/boot.html'
            },
            {
                expand: true,
                cwd: 'src/public/',
                src: ['**'],
                dest: 'build/dev/'
            }
        ],
        options: {
            process: generateLocalSettings
        }
    },
    deploy:  {
        files: [
            {
                src: 'src/index.html',
                dest: 'build/deploy/index.html'
            },
            {
                src: 'src/boot.html',
                dest: 'build/deploy/boot.html'
            },
            {
                expand: true,
                cwd: 'src/public/',
                src: ['**'],
                dest: 'build/deploy/'
            }
        ],
        options: {
            process: removePlaceholders
        }
    }
};