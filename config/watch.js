module.exports = {
	main: {
		files: ["src/**/*"],
		tasks: ["compile-dev", "compile-test"],
		options: {
			livereload: true
		}
	}
};
