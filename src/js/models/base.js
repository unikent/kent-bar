var Backbone = require("exoskeleton"),
	api = require("../lib/api-base");

module.exports = Backbone.Model.extend({
	api: api,

	_parseQuickspotString: function(str){

		str = str.toLowerCase();
		// remove ' " ( ) , . ?
		str = str.replace(/(\"|\'|\,|\.|\)|\(|\-)/g, "");
		// & = and
		str = str.replace(/\&/g, "and");

		return str;
	}
});
