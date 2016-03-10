var BaseView = require("./base"),
    template = require("../templates/menu.hbs");

module.exports = BaseView.extend({

	initialize: function(){
		// create self
		this.el = document.createElement("div");
		this.el.id = 'kent-bar-menu';
		this.el.innerHTML = template();
	},
	currentMenu: false,
	isOpen: false,

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

		// do stuff
	
	}
});
