module.exports = {
	main: {
		files: ["src/**/*"],
		tasks: ["compile"],
		options: {
			livereload: true
		}
	},
	"lint": {
		files: ["src/**/*"],
		tasks: ["eslint"]
	}
};
