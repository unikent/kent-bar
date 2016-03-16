var Backbone = require("exoskeleton"),
	baseCollection = require("./base"),
	DepartmentModel = require("../models/department");

if (typeof Promise === "undefined"){
	var Promise = require("es6-promise").Promise;
}

module.exports = baseCollection.extend({

	cache_key:"kentbar.departments",

	model: DepartmentModel,
	ready: false,
	loaded: false,

	url: function () {
		return this.api.get() + "v1/departments?flat=true";
	},

	initialize: function () {
		var here = this;
		this.loaded = new Promise(function(success, fail){
			here.on("reset", function(){
				here.ready = true;
				success(here);
			});
			here.on("error", function(){
				here.ready = false;
				fail(here);
			});
		});
	},

	parse: function (response) {
		this.storeResponse(response);
		return response;
	}

});
