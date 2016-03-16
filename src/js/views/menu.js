var app = require('../app'),
	BaseView = require("./base"),
	helper = require("../lib/helper"),
	quickspot = window.KENT.modules.quickspot,
	template = require("../templates/menu.hbs");

module.exports = BaseView.extend({

	initialize: function(data){
		// create self
		this.el = document.createElement("div");
		this.el.id = "kent-bar-menu";
		this.el.innerHTML = template();
		this.services = data.services;
		this.departments = data.departments;

		// containers for sections
		this.sections = {
			"user": this.el.querySelector(".user-section"),
			"keyServices": this.el.querySelector(".user-services-section"),
			"searchServices": this.el.querySelector(".search-services"),
			"favroites": this.el.querySelector(".favorites-section")
		};

		// Boot quickspot instance
		this.qs.instance = quickspot.attach({
			target: this.el.querySelector("#kent-bar-search"),
			data: {},
			disable_occurrence_weighting: true,
			auto_highlight: true,
			hide_on_blur: false,
			display_handler: this.renderSearchResult,
			click_handler: this.handleSearchClick,
			css_class_prefix: "kentbar-quickspot",
			safeload: false
		});

		var that = this;

		this.qs.instance.target.addEventListener("quickspot:showresults", function(){
			that.sections.keyServices.style.display = "none";
		});
		this.qs.instance.target.addEventListener("quickspot:hideresults", function(){
			that.sections.keyServices.style.display = "block";
		});

		// Close on click off
		document.body.addEventListener("click", function(e){
			if (!that.isOpen) {return;}
			if (!helper.isNodeDecendantOf(e.target, window.KENT.kentbar.app.container.querySelector("#kent-bar-menu")) && !helper.isNodeDecendantOf(e.target, window.KENT.kentbar.app.container.querySelector(".audience-nav-links"))){
				that.hide();
			}
		});

	},
	currentMenu: false,
	isOpen: false,
	services: false,
	departments: false,
	sections: {},
	qs: { datastores: {}},
	open: function(menu){
		// handle request to open a given menu
		if (this.currentMenu === menu && this.isOpen){
			this.hide();
		} else {
			if (this.currentMenu !== menu){
				this.render(menu);
				this.currentMenu = menu;
				this.trigger("menu:change", menu);
			}
			this.show();
		}
	},
	show: function(){
		// display the menu
		this.el.style.display = "block";
		this.isOpen = true;
		helper.addClass(document.body, "show-kentbar-menu");
		this.trigger("menu:open");
	},
	hide: function(){
		// hide the menu
		this.el.style.display = "none";
		this.isOpen = false;
		helper.removeClass(document.body, "show-kentbar-menu");
		this.trigger("menu:close");
	},
	render: function (menu) {
		if (menu === "departments"){
			this.renderDepartments(menu);
		} else {
			this.renderServices(menu);
		}
	},
	renderServices: function(menu){
		var here = this;
		this.services.loaded.then(function(services){
			var user_services = [];
			if (typeof services.key_services[menu] !== "undefined"){
				user_services = services.key_services[menu].default;
			}
			here.renderKeyServices(user_services);
			here.renderServicesSearch(menu);
		});
	},
	renderDepartments: function(type){
		var here = this;

		this.qs.instance.target.placeholder = "Search departments...";

		this.departments.loaded.then(function(depts){
			here._setQuickspotDataStore(type, function(){
				return depts.models;
			});
		});
		this.renderKeyServices([]);
	},
	renderSearchResult: function(service){
		return service.get("title");
	},
	handleSearchClick: function(service){
		document.location.href = service.get("link");
		return false;
	},
	renderServicesSearch: function(type){
		// set placeholder
		this.qs.instance.target.placeholder = "Search " + type + " systems and services...";

		var here = this;
		this._setQuickspotDataStore(type, function(){
			return here.services.filterWithTags(["general", type]);
		});
	},
	renderKeyServices: function(services){
		var markup = "";
		services.forEach(function(service){
			markup += "<a href=\"" + service.get("link") + "\" class=\"key-service " + service.get("icon") + "\">" + service.get("title") + "</a>";
		});

		this.sections.keyServices.innerHTML = markup;
		this.sections.keyServices.style.display = "block";
	},
	_setQuickspotDataStore: function(name, getDataCallback){

		// init datastore if needed
		if (typeof this.qs.datastores[name] === "undefined"){
			var dataSet = getDataCallback();
			var datastore = quickspot.datastore({data: dataSet});
			this.qs.datastores[name] = datastore.store;
		}

		// Set store in to use
		this.qs.instance.setDatastore(this.qs.datastores[name]);

		// Blank search string
		this.qs.instance.target.value = "";
	}
});
