var Backbone = require("exoskeleton"),
	baseCollection = require("./base"),
	DepartmentModel = require("../models/department");

module.exports = baseCollection.extend({

	cache_key:"kentbar.departments",

	model: DepartmentModel,

	url: function () {
		return this.api.get() + "/v1/departments?flat=true";
	},

	initialize: function () {

	},

	parse: function (response) {
		this.storeResponse(response);
		return response;
	}

});
