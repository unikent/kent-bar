var BaseView = require('./base'),
	helper = require('../lib/helper');
    template = require('../templates/bar.hbs');

module.exports = BaseView.extend({

	events: {
		'click button.audience-menu': 'menuToggle'
	},
	navLinksEl: null,
	menuToggle: function(){
		// toogle in class
		if(helper.hasClass(this.navLinksEl, 'in')){
			helper.removeClass(this.navLinksEl, 'in');
		}else{
			helper.addClass(this.navLinksEl, 'in');
		}

	},
	render: function () {
		"use strict";
		this.renderContent(template());

		this.navLinksEl = this.el.querySelector(".audience-nav-links");


    }
});