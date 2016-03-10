module.exports = {
	build: {
		options: {
			configFile: "config/_eslint_build.json"
		},
		src: [
			"config/*.js",
			"Gruntfile.js"
		]
	},
	app: {
		options: {
			configFile: "config/_eslint_app.json"
		},
		src: [
			"src/js/**/*.js",
			"test/**/*.js"
		]
	}
};
