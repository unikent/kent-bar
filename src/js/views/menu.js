var BaseView = require("./base"),
    template = require("../templates/menu.hbs");

module.exports = BaseView.extend({

	initialize: function(data){
		// create self
		this.el = document.createElement("div");
		this.el.id = 'kent-bar-menu';
		this.el.innerHTML = template();
		this.services = data.services;

		this.sections = {
			"user": this.el.querySelector('.user-section'),
			"keyServices": this.el.querySelector('.user-services-section'),
			"searchServices": this.el.querySelector('.search-services')
		}
	},
	currentMenu: false,
	isOpen: false,
	services: false,
	sections: {},
	open: function(menu){
		if(this.currentMenu === menu && this.isOpen){
			this.hide();
		}else{
			if(this.currentMenu !== menu){
				this.render(menu);
				this.currentMenu = menu;
			}
			this.show();
		}	
	},
	show: function(){
		this.el.style.display = 'block';
		this.isOpen = true;
	},
	hide: function(){
		this.el.style.display = 'none';
		this.isOpen = false;
	},
	render: function (menu) {
		var here = this;
		this.services.loaded.then(function(services){
			var user_services = services.key_services[menu].default;
			here.renderKeyServices(user_services);
		});
	},
	renderKeyServices: function(services){
		var markup = '';
		services.forEach(function(service){
			markup += '<a href="'+ service.get('url') +'" class="key-service '+ service.get('icon') +'">'+ service.get('title') +'</a>';
		});
		this.sections.keyServices.innerHTML = markup;
	}
});
