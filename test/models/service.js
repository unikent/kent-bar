/*global describe: false, it: false */
var ServiceModel = require("../../src/js/models/service"),
	chai = require("chai"),
	expect = chai.expect;

describe("Service Model", function () {
	"use strict";

	describe("parse", function () {
		it("renames url", function () {

			var service = new ServiceModel();

			var result = service.parse({foo:"bar", url:"test"});

			expect(result.foo).to.equal("bar");
			expect(result.url).to.not.exist;
			expect(result.link).to.equal("test");
		});
	});
});
