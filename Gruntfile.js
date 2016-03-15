module.exports = function (grunt) {
	"use strict";
	var initConfig = require("./config/get-config.js")(grunt);

	grunt.initConfig(initConfig);

	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-sass");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-eslint");

	grunt.registerTask("lint", ["eslint", "watch:lint"]);
	grunt.registerTask("compile-test",  ["clean:test", "copy:test", "browserify:test", "sass:test"]);
	grunt.registerTask("compile-dev",  ["clean:dev", "copy:dev", "browserify:dev", "sass:dev"]);
	grunt.registerTask("compile-deploy",  ["clean:deploy", "copy:deploy", "browserify:deploy", "sass:deploy", "uglify"]);
	grunt.registerTask("compile", ["compile-dev", "compile-deploy"]);
	grunt.registerTask("server", ["compile-dev", "connect:all", "watch:main"]);
	grunt.registerTask("default", ["compile"]);

};
