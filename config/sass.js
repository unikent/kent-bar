module.exports = {
	test: {
		files: {
			"build/test/assets/main.css": "src/scss/master.scss"
		}
	},
	dev: {
		files: {
			"build/dev/assets/main.css": "src/scss/master.scss"
		}
	},
	deploy: {
		files: {
			"build/deploy/assets/main.css": "src/scss/master.scss"
		}
	}
};
