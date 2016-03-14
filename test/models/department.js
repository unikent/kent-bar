/*global describe: false, it: false */
var DepartmentModel = require("../../src/js/models/department"),
	chai = require("chai"),
	sinon = require("sinon"),
	expect = chai.expect;

describe("Department Model", function () {
	"use strict";

	describe("parse", function () {
		it("renames url", function () {

			var department = new DepartmentModel();

			var result = department.parse({foo:"bar", url:"test"});

			expect(result.foo).to.equal("bar");
			expect(result.url).to.not.exist;
			expect(result.link).to.equal("test");
		});

	});

});
