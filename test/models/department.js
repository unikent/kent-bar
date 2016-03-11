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

		it("transforms title", function () {

			var department = new DepartmentModel();

			department.transformTitle = function(){
				return "foobar";
			};

			var result = department.parse({title:"bar"});

			expect(result.title).to.equal("foobar");
		});

		it("passes transformTitle the title", function () {

			var department = new DepartmentModel();

			department.transformTitle = sinon.spy();
			var result = department.parse({title:"bar"});

			expect(department.transformTitle.calledWith("bar")).to.equal(true);
		});

		it("stores title to sort_title", function(){
			var department = new DepartmentModel();

			var result = department.parse({title:"bar"});

			expect(result.sort_title).to.equal("bar");
		});
	});

	describe("transformTitle", function () {
		it("does not effect a title with no comma", function () {
			var department = new DepartmentModel();

			var title = department.transformTitle("test");

			expect(title).to.equal("test");
		});

		it("transforms a title with a comma correctly", function () {
			var department = new DepartmentModel();

			var title = department.transformTitle("test, a b c");

			expect(title).to.equal("a b c test");

			title = department.transformTitle("test , a b c ");

			expect(title).to.equal("a b c test");

			title = department.transformTitle("test, foo, bar, a b c");

			expect(title).to.equal("a b c test, foo, bar");
		});
	});
});
