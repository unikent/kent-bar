var Backbone = require("exoskeleton"),
	api = require("../lib/api-base");

module.exports = Backbone.Collection.extend({
	api: api
});
