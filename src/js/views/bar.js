var BaseView = require("./base"),
	helper = require("../lib/helper"),
	Menu = require("./menu"),
    template = require("../templates/bar.hbs");

module.exports = BaseView.extend({

	events: {
		"click button.audience-menu": "mobileMenuToggle",
		"click nav.audience-nav-links a": "menuClick"
	},
	navLinksEl: null,
	menu: null,
	menuClick: function(e){
		// Create menu now we need it
		if(!this.menu){
			this.menu = new Menu();
			this.el.parentNode.insertBefore(this.menu.el, this.el.nextSibling);
		}
		// toggle it
		this.menu.open(this.target.getAttribute("data-action"));
	},
	mobileMenuToggle: function(e){

		// toogle in class + aria states
		if (helper.hasClass(this.navLinksEl, "in")){
			e.target.setAttribute("aria-expanded", "false");
			helper.removeClass(this.navLinksEl, "in");
		} else {
			e.target.setAttribute("aria-expanded", "true");
			helper.addClass(this.navLinksEl, "in");
		}
	},
	render: function () {
		"use strict";
		this.renderContent(template());

		this.navLinksEl = this.el.querySelector(".audience-nav-links");
	}
});
