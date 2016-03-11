/*global describe: false, it: false */
var BaseCollection = require("../../src/js/collections/base"),
	chai = require("chai"),
	sinon = require("sinon"),
	expect = chai.expect;

describe("BaseCollection", function () {
	"use strict";

	describe("storeResponse", function () {
		it("does nothing if did_fetch is not true", function () {

			var collection = new BaseCollection();
			collection.cache_key = "foobar";
			collection.storeResponse("test");

			expect(localStorage.getItem("foobar")).to.not.exist;
		});
		it("does nothing if cache_key is false", function () {

			var collection = new BaseCollection();
			collection.storeResponse("test");

			expect(localStorage.getItem("foobar")).to.not.exist;
		});
		it("stores response in local storage", function () {

			var collection = new BaseCollection();
			collection.cache_key = "foobar";
			collection.did_fetch = true;
			collection.storeResponse("test");

			var stored = localStorage.getItem("foobar");
			expect(stored).to.exist;
			stored = JSON.parse(stored);
			expect(stored.timestamp).to.to.be.a("number");
			expect(stored.timestamp % 1).to.equal(0);
			expect(stored.payload).to.equal("test");
		});
	});

	describe("fetch", function () {

		var requests;
		var xhr;

		before(function(){
			localStorage.removeItem("foobar");
		});

		beforeEach(function () {
			xhr = sinon.useFakeXMLHttpRequest();
			requests = [];
			xhr.onCreate = function (req) { requests.push(req); };
		});

		afterEach(function () {
			// Like before we must clean up when tampering with globals.
			xhr.restore();
			localStorage.removeItem("foobar");
		});

		it("uses native behaviour if no cache exists", function(){
			var collection = new BaseCollection();
			collection.url = "/foo";
			collection.fetch({});
			expect(requests).to.have.length(1);
		});

		it("sets did_fetch if no cache exists", function () {
			var collection = new BaseCollection();
			collection.url = "/foo";
			collection.fetch({});
			expect(collection.did_fetch).to.equal(true);
		});

		it("retrieves value from cache", function () {
			var collection = new BaseCollection();
			collection.url = "/foo";
			collection.cache_key = "foobar";

			localStorage.setItem("foobar", JSON.stringify({"timestamp":Date.now(), "payload":"test"}));

			var resp  = collection.fetch({});
			expect(resp).to.have.all.keys(["payload", "timestamp"]);
		});

		it("no ajax request to be made when retrieving from cache", function () {
			var collection = new BaseCollection();
			collection.url = "/foo";
			collection.cache_key = "foobar";

			localStorage.setItem("foobar", JSON.stringify({"timestamp":Date.now(), "payload":"test"}));

			collection.fetch({});
			expect(requests).to.have.length(0);
		});

		it("does not set did_fetch if it retrieved from cache", function () {
			var collection = new BaseCollection();
			collection.url = "/foo";
			collection.cache_key = "foobar";

			localStorage.setItem("foobar", JSON.stringify({"timestamp":Date.now(), "payload":"test"}));

			collection.fetch({});
			expect(collection.did_fetch).to.equal(false);

		});

		it("ignores an old cache and uses native behaviour", function () {
			var collection = new BaseCollection();
			collection.url = "/foo";
			collection.cache_key = "foobar";

			localStorage.setItem("foobar", JSON.stringify({"timestamp":1, "payload":"test"}));

			collection.fetch({});

			expect(collection.did_fetch).to.equal(true);
			expect(requests).to.have.length(1);

		});

		it("calls success function if in options, when retrieving from cache", function () {
			var collection = new BaseCollection();
			collection.url = "/foo";
			collection.cache_key = "foobar";

			localStorage.setItem("foobar", JSON.stringify({"timestamp":Date.now(), "payload":"test"}));
			var wasCalled = false;

			collection.fetch({success:function(){ wasCalled = true;}});

			expect(wasCalled).to.equal(true);
		});

		it("calls reset when reset is set in options, when retrieving from cache", function () {
			var collection = new BaseCollection();
			collection.url = "/foo";
			collection.cache_key = "foobar";

			localStorage.setItem("foobar", JSON.stringify({"timestamp":Date.now(), "payload":"test"}));
			var wasCalled = false;

			collection.reset = function(){
				wasCalled = true;
			};

			collection.fetch({reset:true});

			expect(wasCalled).to.equal(true);
		});

		it("calls set by default, when retrieving from cache", function () {
			var collection = new BaseCollection();
			collection.url = "/foo";
			collection.cache_key = "foobar";

			localStorage.setItem("foobar", JSON.stringify({"timestamp":Date.now(), "payload":"test"}));
			var wasCalled = false;

			collection.set = function(){
				wasCalled = true;
			};

			collection.fetch({});

			expect(wasCalled).to.equal(true);
		});

		it("triggers a sync event, when retrieving from cache", function () {
			var collection = new BaseCollection();
			collection.url = "/foo";
			collection.cache_key = "foobar";

			localStorage.setItem("foobar", JSON.stringify({"timestamp":Date.now(), "payload":"test"}));
			var wasCalledWith = [];

			collection.trigger = sinon.spy();

			collection.fetch({foo:1});

			expect(collection.trigger.calledWith("sync", collection, "test", {foo:1})).to.equal(true);
		});

	});


});
