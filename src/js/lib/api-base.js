module.exports = {
	get: function () {
		"use strict";

		window.KENT = window.KENT || {};
		window.KENT.settings = window.KENT.settings || {};

		return window.KENT.settings.api_url || "https://api.kent.ac.uk/api/";
	}
};
