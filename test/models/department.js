/*global describe: false, it: false */
var DepartmentModel = require("../../src/js/models/department"),
	chai = require("chai"),
	sinon = require("sinon"),
	expect = chai.expect;

describe("Department Model", function () {
	"use strict";


	describe("validate", function () {

		it("allows valid object", function () {
			var department = new DepartmentModel({"title":"b", "url": "cupcake"});
			department.isValid();
			expect(department.validationError).to.equal(null);
		});

		it("gets error with no valid params", function () {
			var department = new DepartmentModel({"a": "b"});
			department.isValid();
			expect(department.validationError).to.be.a("string");
		});

		it("gets error when only has url", function () {
			var department = new DepartmentModel({"title": "cupcake"});
			department.isValid();
			expect(department.validationError).to.be.a("string");
		});

		it("gets error when only has title", function () {
			var department = new DepartmentModel({"url": "cupcake"});
			department.isValid();
			expect(department.validationError).to.be.a("string");
		});

		it("gets error when link is set", function () {
			var department = new DepartmentModel({"title":"b", "url": "cupcake", "link": "waffles"});
			department.isValid();
			expect(department.validationError).to.be.a("string");
		});

	});

	describe("parse", function () {
		it("renames url", function () {

			var department = new DepartmentModel();

			var result = department.parse({foo:"bar", url:"test"});

			expect(result.foo).to.equal("bar");
			expect(result.url).to.not.exist;
			expect(result.link).to.equal("test");


			expect(result.link).to.equal("test");

		});

		it("check quickspot values get set", function () {
			var department = new DepartmentModel();
			var result = department.parse({title:"Uber Science", url:"someurl"});
			// they are set on the object, not its attrs
			expect(department.__keyvalue).to.exist;
			expect(department.__searchvalues).to.exist;
			expect(department.__keyvalue).to.equal("uber science");
			expect(department.__searchvalues).to.equal("uber science");
		});

	});

});
