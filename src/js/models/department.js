var Backbone = require("exoskeleton"),
	baseModel = require("./base");

module.exports = baseModel.extend({

	parse: function (response) {
		if (typeof response.title !=="undefined") {
			response.sort_title = response.title;
			response.title = this.transformTitle(response.title);
		}
		if (typeof response.url !=="undefined") {
			response.link = response.url;
			delete response.url;
		}
		return response;
	},

	transformTitle: function(t){
		if (t.lastIndexOf(",") > -1){
			t = t.slice(t.lastIndexOf(",")).trim() + " " + t.slice(0, t.lastIndexOf(",").trim());
		}
		return t;
	}
});
