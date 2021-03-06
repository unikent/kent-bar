var BaseView = require("./base"),
	helper = require("../lib/helper"),
	Menu = require("./menu"),
	template = require("../templates/bar.hbs");

module.exports = BaseView.extend({

	events: {
		"click button.audience-menu": "mobileMenuToggle",
		"click nav.audience-nav-links a": "menuClick",
		"keyup nav.audience-nav-links a": "menuKeyDown",
		"click .back" : function(){
			this.menu.back();
			this._clearLinkOpenStates();
			this.mobileMenuOpen();
		}
	},
	collections: null,
	navLinksEl: null,
	menu: null,
	components: [],


	initialize: function(){
		var that = this;
		helper.addClass(this.el, "kent-bar");

		window.KENT.kentbar.config.components.forEach(function(i){
			if (typeof window.KENT.kentbar.components[i] !== "undefined") {
				that.components.push(window.KENT.kentbar.components[i]);
			}
		});

		if (typeof window.KENT.kentbar.config.custom_link === "object" &&
			typeof window.KENT.kentbar.config.custom_link.title === "string" &&
			typeof window.KENT.kentbar.config.custom_link.url === "string"
		){
			this.components.push(window.KENT.kentbar.config.custom_link);
		}
	},
	menuKeyDown: function(e){
		if(e.keyCode == 13 || e.keyCode == 32){
			this.menuClick(e);
		}	
	},
	menuClick: function(e){
		var target = e.target;
		var menu_name = e.target.getAttribute("data-action");
		var menu_title = e.target.innerText;
		if (menu_name !== null) {
			e.preventDefault();
			this.toggleMenu(menu_name, menu_title, target);
		}
		return false;
	},

	toggleMenu: function(menu_name, menu_title, trigger){
		if (menu_name !== null) {

			// Create menu now that we need it
			if (!this.menu){
				// create markup
				this.menu = new Menu(this.collections, menu_title);
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
					that.el.setAttribute("aria-expanded", "false");
					window.dispatchEvent( new CustomEvent("kentbar_menu:close", {detail: {menu: menu}}));
				});
				this.menu.on("menu:change", function (menu) {
					that._clearLinkOpenStates(menu);
					window.dispatchEvent( new CustomEvent("kentbar_menu:change", {detail: {menu: menu}}));
				});
			}

			// update clicked links
			helper.addClass(trigger, "in");
			trigger.setAttribute("aria-expanded", "true");

			// toggle menu itself
			this.menu.open(menu_name, menu_title);
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
		this.renderContent(template({components: this.components}));

		helper.addClass(this.el.querySelector(".audience-nav-links"), "kent-bar-" + this.components.length + "-links");
	},
	_clearLinkOpenStates: function(exclude){
		// Get open links in menu & close them all
		var openNodes = this.el.querySelectorAll("nav a.in");
		for (var i = 0; i < openNodes.length; ++i) {
			if (openNodes.hasOwnProperty(i)){
				// if node is the "exclude", don't close it - this is probably the one just activated
				if (openNodes[i].getAttribute("data-action") === exclude){
					continue;
				}

				// close nodes
				helper.removeClass(openNodes[i], "in");
				openNodes[i].setAttribute("aria-expanded", "false");
			}
		}
	}
});
