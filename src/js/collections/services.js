var Backbone = require("exoskeleton"),
	baseCollection = require("./base"),
	ServiceModel = require("../models/service");

module.exports = baseCollection.extend({

	model: ServiceModel,

	url: function () {
		return this.api.get() + "/v1/services";
	},

	key_services: false,

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
						ks = [];
						for (var i= 0; i<this.key_services[type][group].length; i++){
							ks.push(this.get(this.key_services[type][group][i]));
						}
						this.key_services[type][group] = ks;
					}
				}
			}
		}
	},

	filterWithTags: function(tags){
		if (!tags instanceof Array){
			return this;
		} else {
			return this.filter(function (service) {

				for (var i = 0; i < tags.length; i++) {
					if (service.get("tags").indexOf(tags[i]) > -1) {
						return true;
					}
				}
				return false;
			});
		}
	}

});