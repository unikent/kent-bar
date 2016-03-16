/*global describe: false, it: false */
var api = require("../../src/js/lib/api-base"),
	chai = require("chai"),
	expect = chai.expect;

describe("apiBase", function () {
	"use strict";
	describe("get", function () {
		it("returns the api_url from settings if set", function () {
			window.KENT = window.KENT || {};
			window.KENT.settings = window.KENT.settings || {};
			window.KENT.settings.api_url = window.KENT.settings.api_url || "TEST_TEST_TEST";
			var apiBase = api.get();
			expect(apiBase).to.equal(window.KENT.settings.api_url);
		});

		it("returns default api_url if not provided", function () {
			window.KENT = window.KENT || {};
			window.KENT.settings = window.KENT.settings || {};
			window.KENT.settings.api_url = false;
			var apiBase = api.get();
			expect(apiBase).to.equal("https://api.kent.ac.uk/api/");
		});

	});

});
