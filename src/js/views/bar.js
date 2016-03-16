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

		var target = e.target;
		var menu_name = e.target.getAttribute("data-action");
		if (menu_name !== null) {
			e.preventDefault();
			this.toggleMenu(menu_name, target);
			e.target.setAttribute("aria-expanded", "true");
		}
		return false;
	},

	toggleMenu: function(menu_name, trigger){
		if (menu_name !== null) {

			// Create menu now that we need it
			if (!this.menu){
				// create markup
				this.menu = new Menu(this.collections);
				this.el.appendChild(this.menu.el);

				var that = this;
				// listen to its events
				this.menu.on("menu:open", function (menu) {
					helper.addClass(that.el, "in");
					window.dispatchEvent( new CustomEvent("kentbar_menu:open", {detail: {menu: menu}}));
				});
				this.menu.on("menu:close", function (menu) {
					that._clearLinkOpenStates();
					helper.removeClass(that.el, "in");
					window.dispatchEvent( new CustomEvent("kentbar_menu:close", {detail: {menu: menu}}));
				});
				this.menu.on("menu:change", function (menu) {
					that._clearLinkOpenStates(menu);
					window.dispatchEvent( new CustomEvent("kentbar_menu:change", {detail: {menu: menu}}));
				});
			}

			// update clicked links

			helper.addClass(trigger, "in");
			// toggle menu itself
			this.menu.open(menu_name);
		} else {
			this.menu.hide();
		}
	},

	mobileMenuToggle: function(e){
		// toggle in class + aria states on mobile button
		if (helper.hasClass(this.el, "in")){
			this.mobileMenuClose();
		} else {
			this.mobileMenuOpen();
		}
		// menu should close if this was clicked.
		if (this.menu && this.menu.isOpen){
			this.menu.hide();
		}
	},
	mobileMenuOpen:function(){
		var button = this.el.querySelector("button.audience-menu");
		button.setAttribute("aria-expanded", "true");
		helper.addClass(this.el, "in");
		window.dispatchEvent( new CustomEvent("kentbar_mobilemenu:open", {}));
	},
	mobileMenuClose:function(){
		var button = this.el.querySelector("button.audience-menu");
		button.setAttribute("aria-expanded", "false");
		helper.removeClass(this.el, "in");
		window.dispatchEvent( new CustomEvent("kentbar_mobilemenu:close", {}));
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
