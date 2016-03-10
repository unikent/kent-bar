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
			"build/dev/app.js": ["src/js/app.js"]
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
			"build/test/app.js": ["test/**/*.js", "src/js/app.js"]
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
			"build/deploy/app.js": ["src/js/app.js"]
		}
	}
};
