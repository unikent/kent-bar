/*global describe: false, it: false */
var ServiceModel = require("../../src/js/models/service"),
	chai = require("chai"),
	expect = chai.expect;

describe("Service Model", function () {
	"use strict";

	describe("validate", function () {

		it("allows valid object", function () {
			var service = new ServiceModel({"title":"b", "url": "cupcake"});
			service.isValid();
			expect(service.validationError).to.equal(null);
		});

		it("gets error with no valid params", function () {
			var service = new ServiceModel({"a": "b"});
			service.isValid();
			expect(service.validationError).to.be.a("string");
		});

		it("gets error when only has url", function () {
			var service = new ServiceModel({"title": "cupcake"});
			service.isValid();
			expect(service.validationError).to.be.a("string");
		});

		it("gets error when only has title", function () {
			var service = new ServiceModel({"url": "cupcake"});
			service.isValid();
			expect(service.validationError).to.be.a("string");
		});

		it("gets error when link is set", function () {
			var service = new ServiceModel({"title":"b", "url": "cupcake", "link": "waffles"});
			service.isValid();
			expect(service.validationError).to.be.a("string");
		});

	});

	describe("parse", function () {
		it("renames url", function () {

			var service = new ServiceModel();

			var result = service.parse({foo:"bar", url:"test"});

			expect(result.foo).to.equal("bar");
			expect(result.url).to.not.exist;
			expect(result.link).to.equal("test");
		});

		it("check quickspot values get set", function () {
			var service = new ServiceModel();
			var result = service.parse({title:"System Name!", url:"someurl"});
			// they are set on the object, not its attrs
			expect(service.__keyvalue).to.exist;
			expect(service.__searchvalues).to.exist;
			expect(service.__keyvalue).to.equal("system name");
			expect(service.__searchvalues).to.equal("system name");
		});

	});
});
