
window.KENT  = window.KENT || {};
window.KENT.kentbar  = window.KENT.kentbar || {};
window.KENT.modules = window.KENT.modules || {};
window.KENT.modules.quickspot  = require("quick-spot");

var Backbone = require("exoskeleton"),
	Bar = require("./views/bar.js"),
	NV = require("backbone.nativeview"),
	ServicesCollection = require("./collections/services"),
	DepartmentsCollection = require("./collections/departments");

Backbone.View = NV;
Backbone.ajax = require("backbone.nativeajax");

try {
	new window.CustomEvent("test");
} catch (e) {
	var CustomEvent = function(event, params) {
		var evt;
		params = params || {
			bubbles: false,
			cancelable: false,
			detail: undefined
		};

		evt = document.createEvent("CustomEvent");
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	};

	CustomEvent.prototype = window.Event.prototype;
	window.CustomEvent = CustomEvent; // expose definition to window
}


window.KENT.kentbar.defaults = {
	target: false,
	render:true,
	components: [
		"student",
		"staff"
	],
	custom_link: false,
	styles:{
		kentfont:true,
		fonts:true,
		base:true
	}
};
window.KENT.kentbar.components = {
	student: {title:"Student", action:"student"},
	staff: {title:"Staff", action:"staff"},
	alumni: {title:"Alumni", url:"https://www.kent.ac.uk/alumni/"},
	departments: {title:"Departments", action:"departments"}
};

window.KENT.kentbar.styles = {
	base: "/assets/main.css",
	kentfont:"https://static-test.kent.ac.uk/pantheon/static/webfonts/kentfont/css/kentfont.css", //TODO: update to static live once kentfont updated on live
	fonts:"https://beta.kent.ac.uk/assets/fonts/arial-light.css"
};

if (typeof window.KENT.kentbar.config === "object"){
	for (var i in window.KENT.kentbar.defaults){
		if (window.KENT.kentbar.defaults.hasOwnProperty(i)) {
			if (typeof window.KENT.kentbar.config[i] === "undefined") {
				window.KENT.kentbar.config[i] = window.KENT.kentbar.defaults[i];
			}
		}
	}
} else {
	window.KENT.kentbar.config = window.KENT.kentbar.defaults;
}

var app = {

	services: null,
	departments:null,
	container:null,
	bar:null,

	init: function () {
		"use strict";

		var container = window.KENT.kentbar.config.target,
			app = this;

		this.services = new ServicesCollection();
		this.departments = new DepartmentsCollection();

		document.addEventListener("DOMContentLoaded", function () {
			var barEl;

			if (container === false) {
				barEl = document.createElement("div");
				barEl.id = "kent-bar";

				app.applyContainerOffsets(barEl);

				document.body.insertBefore(barEl, document.body.childNodes[0]);
				container = "#kent-bar";
			}
			app.container = document.querySelector(container);
			app.bar = new Bar({el: container});
			if (window.KENT.kentbar.config.render){
				app.bar.render();
			}

			app.bar.collections = {
				"services": app.services,
				"departments": app.departments
			};

			app.insertStyles();

			app.services.fetch({reset:true});
			app.departments.fetch({reset:true});

			Backbone.history.start();
		});
	},
	// WAT? http://stackoverflow.com/questions/29036874/style-sheets-break-with-title-attribute-on-link-tags
	insertStylesheet : function(url, title) {
		var l = document.createElement("link");
		l.setAttribute("rel", "stylesheet");
		l.setAttribute("type", "text/css");
		// l.setAttribute("title", title);
		l.href = url;
		document.getElementsByTagName("head")[0].appendChild(l);
	},

	insertStyles: function(){
		var url, s;
		for ( s in window.KENT.kentbar.config.styles){
			if (window.KENT.kentbar.config.styles.hasOwnProperty(s)){
				if (window.KENT.kentbar.config.styles[s]){
					if (window.KENT.kentbar.config.styles[s] === true){
						if (typeof window.KENT.kentbar.styles[s] !== "undefined"){
							this.insertStylesheet(window.KENT.kentbar.styles[s], s);
						}
					} else {
						this.insertStylesheet(window.KENT.kentbar.config.styles[s], s);
					}
				}

			}
		}
	},
	applyContainerOffsets: function(kentBar){
		var styles = [];

		// calc offsets
		if (typeof window.getComputedStyle !== "undefined") {

			var bodystyle = window.getComputedStyle(document.body);
			var margin_direction, padding_direction;

			["Top", "Left", "Right"].forEach(function(direction){

				margin_direction = "margin" + direction;
				padding_direction = "padding" + direction;

				if (bodystyle[margin_direction] !== "0px") {
					kentBar.style[margin_direction] = "-" + bodystyle[margin_direction];
				}
				if (bodystyle[padding_direction] !== "0px") {
					kentBar.style[padding_direction]  = "-" + bodystyle[padding_direction];
				}
			});

		}
	}
};


window.KENT.kentbar.app = app;

window.KENT.kentbar.closeMenus = function(){
	window.KENT.kentbar.app.bar.mobileMenuClose();
	if (window.KENT.kentbar.app.bar.menu) {
		window.KENT.kentbar.app.bar.menu.hide();
	}
};
window.KENT.kentbar.toggleMenu = function(menu_name, trigger){
	window.KENT.kentbar.app.bar.toggleMenu(menu_name, trigger);
};



module.exports = app;
app.init();
