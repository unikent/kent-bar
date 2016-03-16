var Backbone = require("exoskeleton"),
	baseModel = require("./base");

module.exports = baseModel.extend({
	validate: function(attrs, options) {

		if (typeof attrs.title !== "string"){
			return "Service must have a title attribute";
		}

		if (typeof attrs.url !== "string"){
			return "Service must have a url attribute";
		}

		if (typeof attrs.link !== "undefined"){
			return "Service must NOT have a link attribute";
		}
	},
	parse: function (response) {
		if (typeof response.url !== "undefined") {
			response.link = response.url;
			delete response.url;
		}

		if (typeof response.title !== "undefined") {
			// only have title to search on so far
			this.__keyvalue = this._parseQuickspotString(response.title);
			this.__searchvalues = this.__keyvalue;
		}

		return response;
	}
});
