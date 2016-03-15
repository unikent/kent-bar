var Backbone = require("exoskeleton"),
	baseModel = require("./base");

module.exports = baseModel.extend({

	parse: function (response) {
		if (typeof response.url !== "undefined") {
			response.link = response.url;
			delete response.url;
		}
		this.__keyvalue	= this._parseQuickspotString(response.title);
		this.__searchvalues = this._parseQuickspotString(response.title + " " + response.tags.join(" "));

		return response;
	}
});
