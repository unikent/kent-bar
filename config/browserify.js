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
			},
			postBundleCB: function (err, src, next) {
				return next(null, '(function () { var define = undefined; '+src+' })();'); //http://stackoverflow.com/questions/25999947/how-to-solve-a-conflict-between-browserify-backbone-based-app-and-require-js-o
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
			},
			postBundleCB: function (err, src, next) {
				return next(null, '(function () { var define = undefined; '+src+' })();')
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
			],
			postBundleCB: function (err, src, next) {
				return next(null, '(function () { var define = undefined; '+src+' })();')
		   }
		},
		files: {
			"build/deploy/assets/app.js": ["src/js/app.js"]
		}
	}
};
