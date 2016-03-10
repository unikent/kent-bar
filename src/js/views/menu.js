var BaseView = require("./base"),
    template = require("../templates/menu.hbs");

module.exports = BaseView.extend({

	initialize: function(){
		this.el = document.createElement("div");
		this.el.className = 'kent-bar-menu';
	},
	render: function () {
		"use strict";
		this.renderContent(template());

		this.navLinksEl = this.el.querySelector(".audience-nav-links");
	}
});
