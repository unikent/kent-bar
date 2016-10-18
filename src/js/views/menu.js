var app = require("../app"),
	BaseView = require("./base"),
	helper = require("../lib/helper"),
	Quickspot = window.KENT.modules.quickspot,
	template = require("../templates/menu.hbs"),
	menuView = false;

module.exports = BaseView.extend({
	currentMenu: false,
	isOpen: false,
	services: false,
	departments: false,
	sections: {},
	qs: { datastores: {}},
	initialize: function(data){
		// make avaiable
		menuView = this;

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
			"footer": this.el.querySelector(".footer-section")
		};

		// Boot quickspot instance
		this.qs.instance = this.initQuickspot();

		// Close kentbar menu when clicked off
		document.body.addEventListener("click", function(e){
			if (!menuView.isOpen) {return;}
			if (!helper.isNodeDecendantOf(e.target, window.KENT.kentbar.app.container.querySelector("#kent-bar-menu")) && !helper.isNodeDecendantOf(e.target, window.KENT.kentbar.app.container.querySelector(".audience-nav-links"))){
				menuView.hide();
			}
		});
	},
	initQuickspot: function(){
		// Boot QS itself
		var quickspotInstance = Quickspot.attach({
			target: this.el.querySelector("#kent-bar-search"),
			data: {},
			disable_occurrence_weighting: true,
			hide_on_blur: false,
			display_handler: this.renderSearchResult,
			click_handler: this.handleSearchClick,
			css_class_prefix: "kentbar-quickspot",
			safeload: false
		});

		// Focus on QS input when section is opened
		this.on("menu:open", function(){
			quickspotInstance.target.focus();
		});

		// Hide key services when quickspot is displaying results.
		quickspotInstance.on("quickspot:showresults", function(e){
			menuView.sections.keyServices.style.display = "none";
		});
		quickspotInstance.on("quickspot:hideresults", function(e){
			menuView.sections.keyServices.style.display = "block";
		});

		// Toggle QS to show all.
		this.sections.footer.querySelector("a").addEventListener("click", function(e){
			menuView.showAllToggle(e);
		});

		// Reset show all when QS is search or menu is changed.
		this.on("menu:change", function(){
			menuView.showAllToggle(false, true);
		});
		quickspotInstance.on("quickspot:start", function(e){
			menuView.showAllToggle(e, true);
		});

		return quickspotInstance;
	},
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
		helper.addClass(document.getElementsByTagName( 'html' )[0],'show-kentbar-menu');
		this.trigger("menu:open");
	},
	hide: function(){
		// hide the menu
		this.el.style.display = "none";
		this.isOpen = false;
		helper.removeClass(document.body, "show-kentbar-menu");
		helper.removeClass(document.getElementsByTagName( 'html' )[0],'show-kentbar-menu');
		this.trigger("menu:close");
	},
	showAllToggle: function(e, reset){
		var target = this.sections.footer.querySelector("a");

		if (e){
			e.preventDefault();
		}

		// Handle reset
		if (reset === true){
			target.setAttribute("data-open", "false");
			target.innerText = "Show all";
			return;
		}

		// handle toggle
		if (target.hasAttribute("data-open") && target.getAttribute("data-open") === "true"){
			target.setAttribute("data-open", "false");
			target.innerText = "Show all";
			this.qs.instance.hideResults();
		} else {
			target.setAttribute("data-open", "true");
			target.innerText = "Hide all";
			this.qs.instance.showAll();
		}
	},
	render: function (menu) {
		if (menu === "departments"){
			this.renderDepartments(menu);
		} else {
			this.renderServices(menu);
		}
	},
	renderServices: function(menu){
		this.services.loaded.then(function(services){
			var user_services = [];
			if (typeof services.key_services[menu] !== "undefined"){
				user_services = services.key_services[menu].default;
			}
			menuView.renderKeyServices(user_services);
			menuView.renderServicesSearch(menu);
		});
		this.sections.footer.style.display = "block";
	},
	renderDepartments: function(type){

		this.qs.instance.target.placeholder = "Search departments...";

		this.departments.loaded.then(function(depts){
			menuView._setQuickspotDataStore(type, function(){
				return depts.models;
			});
		});
		this.sections.footer.style.display = "none";
		this.sections.keyServices.innerHTML = "<a href=\"https://www.kent.ac.uk/departments/\" class=\"dept-a-z\">Departments A-Z</a>";
	},
	renderSearchResult: function(service, qs){

		if (menuView.currentMenu === "departments"){
			return  menuView.renderDepartmentsSearchResult(service, qs);
		}

		// Highlight split matches
		return menuView.highlightResult(qs.lastValue.split(" "), service.get("title"));
	},
	highlightResult: function(search_terms, result_string){
		var flags;
		search_terms.forEach(function(word){
			if (word.length === 0){
				return;
			}
			flags = (word.length === 1) ? "i" : "ig";
			result_string = result_string.replace(RegExp("(" + word + ")(?![^<]*>|[^<>]*<\/)", flags), "<strong>$1</strong>");
		});
		return result_string;
	},
	renderDepartmentsSearchResult: function(department, qs){
		var subtextClass = qs.options.css_class_prefix + "-result-subtext";
		var subtext = "";
		var type = department.get("type");
		var ancestors = department.get("ancestors");
		var title =  menuView.highlightResult(qs.lastValue.split(" "), department.get("title"));

		if (type === "academic"){
			if (ancestors.length > 1) {
				subtext += ancestors[1].title + " - ";
			}
			if (ancestors.length > 0) {
				subtext += ancestors[0].title.replace(/Faculty of /, "");
			}
		} else {
			if (type === "non-academic"){
				type = "Professional service department";
			}
			if (ancestors.length > 0) {
				subtext += ancestors[0].title + " - ";
			}
			subtext += type.charAt(0).toUpperCase() + type.slice(1);
		}
		return title + "<div class=\"" + subtextClass + "\">" + subtext + "</div>";
	},
	handleSearchClick: function(service){
		document.location.href = service.get("link");
		return false;
	},
	renderServicesSearch: function(type){
		// set placeholder
		this.qs.instance.target.placeholder = "Search " + type + " systems and services...";

		this._setQuickspotDataStore(type, function(){
			return menuView.services.filterWithTags(["general", type]);
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
			var datastore = Quickspot.datastore({data: dataSet});
			this.qs.datastores[name] = datastore.store;
		}

		// Set store in to use
		this.qs.instance.setDatastore(this.qs.datastores[name]);

		// Blank search string
		this.qs.instance.target.value = "";
	}
});
