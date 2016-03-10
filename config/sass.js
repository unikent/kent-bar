module.exports = {
	test: {
		files: {
			'build/test/main.css': "src/scss/master.scss"
		}
	},
	dev: {
		files: {
			'build/dev/main.css': "src/scss/master.scss"
		}
	},
	deploy: {
		files: {
			'build/deploy/main.css': "src/scss/master.scss"
		}
	}
};