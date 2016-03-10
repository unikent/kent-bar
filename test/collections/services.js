/*global describe: false, it: false */
var ServicesCollection = require("../../src/js/collections/services"),
	ServiceModel = require("../../src/js/models/service"),
	chai = require("chai"),
	expect = chai.expect;

describe("ServicesCollection", function () {
	"use strict";

	describe("url", function () {
		it("generates correct services url", function () {
			var collection = new ServicesCollection();
			expect(collection.url()).to.equal("FOOBAR/v1/services");
		});
	});

	describe("parse", function () {
		it("populates key_services from response", function () {
			var collection = new ServicesCollection();

			expect(collection.key_services).to.equal(false);

			collection.parse({
				test:"foo",
				key_services:"foobar",
				services:[{id:"test", title:"meh"}, {id:"foobar", title:"boofar"}]
			});

			expect(collection.key_services).to.equal("foobar");
		});

		it("returns services from response", function () {
			var collection = new ServicesCollection();

			var parsed = collection.parse({
				test:"foo",
				key_services:"foobar",
				services:[{id:"test", title:"meh"}, {id:"foobar", title:"boofar"}]
			});
			expect(parsed).to.have.length(2);
			expect(parsed[0].title).to.equal("meh");

		});
	});

	describe("populateKeyServices", function () {
		it("populates key_services with correct service models from the collection", function () {
			var collection = new ServicesCollection();
			collection.add([{id:"test", title:"meh"}, {id:"foobar", title:"boofar"}]);
			collection.key_services = {
				a:{
					first:["foobar", "test"],
					second:["foobar"]
				},
				b:{
					first:["test", "foobar"]
				}
			};
			collection.populateKeyServices();

			expect(collection.key_services.a.first[0]).to.be.instanceOf(ServiceModel);

			expect(collection.key_services.a.first[0].get("title")).to.equal("boofar");
			expect(collection.key_services.a.first[1].get("title")).to.equal("meh");
			expect(collection.key_services.a.second[0].get("title")).to.equal("boofar");
			expect(collection.key_services.b.first[0].get("title")).to.equal("meh");
			expect(collection.key_services.b.first[1].get("title")).to.equal("boofar");

		});
	});

	describe("filterWithTags", function () {
		it("returns a correctly filtered array of services", function () {
			var collection = new ServicesCollection();
			collection.add([
				{id:"test", title:"meh", tags:["a", "b"]},
				{id:"foobar", title:"boofar", tags:["a"]},
				{id:"arg", title:"bleh", tags:["b"]},
				{id:"cheese", title:"bacon", tags:["b", "c"]}
			]);

			var filtered = collection.filterWithTags(["a"]);

			expect(filtered).to.have.length(2);
			expect(filtered[0]).to.be.instanceOf(ServiceModel);
			expect(filtered[0].get("title")).to.equal("meh");
			expect(filtered[1].get("title")).to.equal("boofar");

			filtered = collection.filterWithTags(["b"]);

			expect(filtered).to.have.length(3);
			expect(filtered[0].get("title")).to.equal("meh");
			expect(filtered[1].get("title")).to.equal("bleh");
			expect(filtered[2].get("title")).to.equal("bacon");

			filtered = collection.filterWithTags(["c"]);

			expect(filtered).to.have.length(1);
			expect(filtered[0].get("title")).to.equal("bacon");

			filtered = collection.filterWithTags(["nothing"]);

			expect(filtered).to.have.length(0);

		});
	});

});
