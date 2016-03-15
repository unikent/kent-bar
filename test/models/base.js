/*global describe: false, it: false */
var BaseModel = require("../../src/js/models/base"),
	chai = require("chai"),
	expect = chai.expect;

describe("Base Model", function () {
	"use strict";

	describe("_parseQuickspotString", function () {
		it("renames url", function () {

			var model = new BaseModel();
			expect(model._parseQuickspotString("Hello World!")).to.equal("hello world");

		});

	});

});
