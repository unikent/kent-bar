var Backbone = require("exoskeleton"),
	Bar = require("./views/bar.js"),
	NV = require("backbone.nativeview"),
	ServicesCollection = require("./collections/services"),
	DepartmentsCollection = require("./collections/departments");

Backbone.View = NV;
Backbone.ajax = require("backbone.nativeajax");

var app = {

	services: null,
	departments:null,
	container:null,

	init: function () {
		"use strict";

		var container = window.KENT.kentbar.config.target,
			app = this;

		this.services = new ServicesCollection();
		this.departments = new DepartmentsCollection();

		document.addEventListener("DOMContentLoaded", function () {
			var bar, barEl;

			if (container === false) {
				barEl = document.createElement("div");
				barEl.id = "kent-bar";

				app.applyContainerOffsets(barEl);

				document.body.insertBefore(barEl, document.body.childNodes[0]);
				container = "#kent-bar";
			}
			app.container = document.querySelector(container);
			bar = new Bar({el: container});
			if (window.KENT.kentbar.config.render){
				bar.render();
			}
			bar.services = app.services;
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

window.KENT  = window.KENT || {};
window.KENT.kentbar  = window.KENT.kentbar || {};

window.KENT.kentbar.defaults = {
	target: false,
	render:true,
	components: [
		"student",
		"staff",
		"departments",
		"alumni"
	],
	custom_link: false,
	styles:{
		kentfont:true,
		fonts:true,
		base:true
	}
};

window.KENT.kentbar.styles = {
	base: "/main.css",
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

window.KENT.kentbar.app = app;

module.exports = app;
app.init();
