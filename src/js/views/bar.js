var BaseView = require("./base"),
	helper = require("../lib/helper"),
	Menu = require("./menu"),
	template = require("../templates/bar.hbs");

module.exports = BaseView.extend({

	events: {
		"click button.audience-menu": "mobileMenuToggle",
		"click nav.audience-nav-links a": "menuClick"
	},
	collections: null,
	navLinksEl: null,
	menu: null,

	initialize: function(){
		helper.addClass(this.el, "kent-bar");
	},

	menuClick: function(e){
		e.preventDefault();
		var target = e.target;

		// Create menu now that we need it
		if (!this.menu){
			// create markup
			this.menu = new Menu(this.collections);
			this.el.appendChild(this.menu.el);

			var that = this;
			// listen to its events
			this.menu.on("menu:open", function(){
				helper.addClass(that.el, "in");
			});
			this.menu.on("menu:close", function(){
				that._clearLinkOpenStates();
				helper.removeClass(that.el, "in");
			});
			this.menu.on("menu:change", function(menu_name){
				that._clearLinkOpenStates(menu_name);
			});
		}

		// update clicked links
		e.target.setAttribute("aria-expanded", "true");
		helper.addClass(e.target, "in");

		// toggle menu itself
		this.menu.open(e.target.getAttribute("data-action"));

		return false;
	},
	mobileMenuToggle: function(e){
		// toggle in class + aria states on mobile button
		if (helper.hasClass(this.el, "in")){
			e.target.setAttribute("aria-expanded", "false");
			helper.removeClass(this.el, "in");
		} else {
			e.target.setAttribute("aria-expanded", "true");
			helper.addClass(this.el, "in");
		}
		// menu should close if this was clicked.
		if (this.menu && this.menu.isOpen){
			this.menu.hide();
		}
	},
	render: function () {
		"use strict";
		this.renderContent(template());
	},
	_clearLinkOpenStates: function(exclude){
		// Get open links in menu & close them all
		var openNodes = this.el.querySelectorAll("nav a.in");
		for (var c in openNodes){
			if (openNodes.hasOwnProperty(c)){
				// if node is the "exclude", don't close it - this is probably the one just activated
				if (openNodes[c].getAttribute("data-action") === exclude){
					continue;
				}

				// close nodes
				helper.removeClass(openNodes[c], "in");
				openNodes[c].setAttribute("aria-expanded", "false");
			}
		}
	}
});
