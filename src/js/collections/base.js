var Backbone = require("exoskeleton"),
	api = require("../lib/api-base");

module.exports = Backbone.Collection.extend({

	api: api,

	cache_key:false,

	did_fetch:false,

	storeResponse: function(resp){
		if (this.did_fetch && this.cache_key) {
			localStorage.setItem(this.cache_key, JSON.stringify({timestamp: Date.now(), payload:resp}));
		}
	},

	fetch: function (options) {
		var that = this;


		if (this.cache_key && localStorage && localStorage.getItem(this.cache_key)){

			var resp = JSON.parse(localStorage.getItem(this.cache_key));

			if (resp.timestamp > (Date.now() - 86400000)) {
				var raw = resp;
				resp = resp.payload;

				var method = options.reset ? "reset" : "set";
				options.parse =true;
				this[method](resp, options);
				if (options.success){
					options.success(that, resp, options);
				}
				this.trigger("sync", this, resp, options);
				return raw;
			}
		}

		this.did_fetch = true;
		return Backbone.Collection.prototype.fetch.call(this, options);

	}
});
