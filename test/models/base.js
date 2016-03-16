/*global describe: false, it: false */
var BaseModel = require("../../src/js/models/base"),
	chai = require("chai"),
	expect = chai.expect;

describe("Base Model", function () {
	"use strict";

	describe("_parseQuickspotString", function () {
		it("strips unwanted charicters", function () {
			var model = new BaseModel();
			expect(model._parseQuickspotString("Hello World!")).to.equal("hello world");
			expect(model._parseQuickspotString("HELLO    World")).to.equal("hello world");
			expect(model._parseQuickspotString("Cats & dogs")).to.equal("cats and dogs");
			expect(model._parseQuickspotString("!?* - _ ( )")).to.equal("");
		});

	});

});
