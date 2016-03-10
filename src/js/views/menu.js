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
	menuOpen: false,

	open: function(menu){
		if(currentMenu === menu && menuOpen){
			this.close();
		}else{
			if(currentMenu !== menu){
				this.render(menu);
			}
			this.show();
		}	
	},
	show: function(){
		this.el.style.display = 'block';
		this.menuOpen = true;
	},
	hide: function(){
		this.el.style.display = 'none';
		this.menuOpen = false;
	},
	render: function (menu) {

		// do stuff
	
	}
});
