module.exports = function (grunt) {
    "use strict";
    var config = {
        pkg: grunt.file.readJSON('package.json'),
        browserify: require('./browserify'),
        copy: require('./copy'),
        sass: require('./sass'),
        connect: require('./connect'),
        watch: require('./watch'),
        clean: require('./clean'),
        uglify: require('./uglify'),
        jslint: require('./jslint')
    };
    return config;
};