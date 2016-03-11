var Backbone = require("exoskeleton"),
	api = require("../lib/api-base");

module.exports = Backbone.Collection.extend({

	api: api,

	cache_key:false,

	did_fetch:false,

	storeResponse: function(resp){
		if (this.did_fetch) {
			localStorage.setItem(this.cache_key, JSON.stringify({timestamp: Date.now(), payload:resp}));
		}
	},

	fetch: function (options) {
		var success = options.success;
		var that = this;


		if (this.cache_key && localStorage && localStorage.getItem(this.cache_key)){

			var resp = JSON.parse(localStorage.getItem(this.cache_key));

			if (resp.timestamp > (Date.now() - 86400000)) {
				resp = resp.payload;
				options.success = function (resp) {
					if (success){ success(that, resp, options); }
				};
				var method = options.reset ? "reset" : "set";
				this[method](this.parse(resp), options);
				this.trigger("sync", this, resp, options);
				return resp;
			}
		}

		this.did_fetch = true;
		return Backbone.Collection.prototype.fetch.call(this, options);

	}
});
