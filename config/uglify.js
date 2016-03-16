module.exports = {
	options: {
		compress: {
			drop_console: true
		}
	},
	prod: {
		files: {
			"build/deploy/assets/app.js": ["build/deploy/assets/app.js"]
		}
	}
};
