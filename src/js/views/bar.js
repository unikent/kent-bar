var BaseView = require("./base"),
	helper = require("../lib/helper"),
	Menu = require("./menu"),
    template = require("../templates/bar.hbs");

module.exports = BaseView.extend({

	events: {
		"click button.audience-menu": "mobileMenuToggle",
		"click nav.audience-nav-links a": "menuClick"
	},
	services: null,
	navLinksEl: null,
	menu: null,
	menuClick: function(e){
		// Create menu now we need it
		if(!this.menu){
			this.menu = new Menu({services: this.services});
			this.el.appendChild(this.menu.el);
			//this.el.parentNode.insertBefore(this.menu.el, this.el.nextSibling);
		}
		// toggle it
		this.menu.open(e.target.getAttribute("data-action"));
	},
	mobileMenuToggle: function(e){

		if(this.menu && this.menu.isOpen){
			this.menu.hide();
		}

		// toogle in class + aria states
		if (helper.hasClass(this.el, "in")){
			e.target.setAttribute("aria-expanded", "false");
			helper.removeClass(this.el, "in");
		} else {
			e.target.setAttribute("aria-expanded", "true");
			helper.addClass(this.el, "in");
		}
	},
	render: function () {
		"use strict";
		this.renderContent(template());
	}
});
