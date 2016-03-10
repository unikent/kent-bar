var Backbone = require("exoskeleton"),
	baseCollection = require("./base"),
	ServiceModel = require("../models/service");

module.exports = baseCollection.extend({

	model: ServiceModel,

	url: function () {
		return this.api.get() + "/v1/services";
	},

	key_services: {},

	initialize: function () {
		this.on("reset", this.populateKeyServices);
	},

	parse: function (response) {
		this.key_services = response.key_services;
		return response.services;
	},

	populateKeyServices: function () {
		var type, group, ks, that = this;

		for (type in this.key_services) {
			if (this.key_services.hasOwnProperty(type)) {
				for (group in this.key_services[type]) {
					if (this.key_services[type].hasOwnProperty(group)) {
						ks = that.filter(function (service) {
							return (that.key_services[type][group].indexOf(service.get("id")) > -1);
						});
						this.key_services[type][group] = new Backbone.Collection(ks);
					}
				}
			}
		}
	}

});
