var hbsfy = require("hbsfy");

module.exports = {
	dev: {
		options: {
			ignore: ["jquery", "underscore"],
			transform: [
				hbsfy,
				["aliasify", {
					aliases: {
						"backbone": "exoskeleton"
					},
					global: true,
					verbose: true
				}]
			],
			browserifyOptions: {
				debug: true
			}
		},
		files: {
			"build/dev/assets/app.js": ["src/js/app.js"]
		}
	},
	test: {
		options: {
			ignore: ["jquery", "underscore"],
			transform: [
				hbsfy,
				["aliasify", {
					aliases: {
						"backbone": "exoskeleton"
					},
					global: true,
					verbose: false
				}]
			],
			browserifyOptions: {
				debug: true
			}
		},
		files: {
			"build/test/assets/app.js": ["test/**/*.js", "src/js/app.js"]
		}
	},
	deploy: {
		options: {
			ignore: ["jquery", "underscore"],
			transform: [
				hbsfy,
				["aliasify", {
					aliases: {
						"backbone": "exoskeleton"
					},
					global: true,
					verbose: true
				}]
			]
		},
		files: {
			"build/deploy/assets/app.js": ["src/js/app.js"]
		}
	}
};
