var Backbone = require("exoskeleton"),
	api = require("../lib/api-base");

module.exports = Backbone.Model.extend({
	api: api,

	_parseQuickspotString: function(str){

		if (typeof str != "string"){
			return "";
		}
		// all lower ase
		str = str.toLowerCase();
		// & -> and
		str = str.replace(/\&/g, "and");
		// Strip anything other than a-z0-9 and spaces between words
		return str.replace(/[^a-z 0-9]/g, "").replace(/\s+/g, " ").trim();
	}
});
