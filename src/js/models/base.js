var Backbone = require("exoskeleton"),
	api = require("../lib/api-base");

module.exports = Backbone.Model.extend({
	api: api,

	_parseQuickspotString: function(str){

		str = str.toLowerCase();
		str = str.replace(/\&/g, "and");
		// the space is on purpose, spaces are allowed
		str = str.replace(/[^a-z 0-9]/g, "");

		return str;
	}
});
