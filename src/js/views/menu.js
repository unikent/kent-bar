var BaseView = require("./base"),
	helper = require("../lib/helper"),
	quickspot = require("quick-spot"),
	template = require("../templates/menu.hbs");

module.exports = BaseView.extend({

	initialize: function(data){
		// create self
		this.el = document.createElement("div");
		this.el.id = "kent-bar-menu";
		this.el.innerHTML = template();
		this.services = data.services;

		// containers for sections
		this.sections = {
			"user": this.el.querySelector(".user-section"),
			"keyServices": this.el.querySelector(".user-services-section"),
			"searchServices": this.el.querySelector(".search-services"),
			"favroites": this.el.querySelector(".favorites-section")
		};

		// Boot quickspot instance
		this.qs.instance = quickspot.attach({target: this.el.querySelector("#kent-bar-search"), data: {} });

		// Close on click off
		var that = this;
		document.body.addEventListener("click", function(e){
			if (!helper.isNodeDecendantOf(e.target, document.getElementById("kent-bar"))){
				that.hide();
			}
		});

	},
	currentMenu: false,
	isOpen: false,
	services: false,
	sections: {},
	qs: { datastores: {}},
	open: function(menu){
		// handle request to open a given menu
		if (this.currentMenu === menu && this.isOpen){
			this.hide();
		} else {
			if (this.currentMenu !== menu){
				this.render(menu);
				this.currentMenu = menu;
				this.trigger("menu:change", menu);
			}
			this.show();
		}
	},
	show: function(){
		// display the menu
		this.el.style.display = "block";
		this.isOpen = true;
		this.trigger("menu:open");
	},
	hide: function(){
		// hide the menu
		this.el.style.display = "none";
		this.isOpen = false;
		this.trigger("menu:close");
	},
	render: function (menu) {
		// draw the menu
		var here = this;
		this.services.loaded.then(function(services){
			var user_services = [];
			if (typeof services.key_services[menu] !== "undefined"){
				user_services = services.key_services[menu].default;
			}

			here.renderKeyServices(user_services);

			here.renderServicesSearch(menu);
		});
	},
	renderServicesSearch: function(type){
		// set placeholder
		this.qs.instance.target.placeholder = "Search " + type + " systems and services...";

		window.quickspot = quickspot;
		window.dataz = this.services.filterWithTags(['general', type]);


		if(typeof this.qs.datastores[type] === 'undefined'){
			
			var payload = this.services.filterWithTags(['general', type]);

			console.log(this._quickspoify(payload));
			//console.log(quickspot.datastore({data: payload, search_on: [] }));
			//console.log("!!!!!!!");

			//console.log(this.qs.datastores[type]);
			window.ds = this.qs.datastores[type];
		}

		this.qs.instance.datastore = this.qs.datastores[type];
		this.qs.instance.lastValue = '';
		
		
		
	},
	renderKeyServices: function(services){
		var markup = "";
		services.forEach(function(service){
			markup += "<a href=\"" + service.get("url") + "\" class=\"key-service " + service.get("icon") + "\">" + service.get("title") + "</a>";
		});
		this.sections.keyServices.innerHTML = markup;
	},
	_quickspoify: function(collection){
		var data_set = [], tmp;

		collection.forEach(function(item){
			tmp = item.attributes;
			tmp.model = item;
			tmp.tags = tmp.tags.join(' ');
			data_set.push(tmp)
		});
		console.log(data_set);

		return quickspot.datastore({data: data_set, search_on: ['id', 'title', 'tags'] , 'key_value': 'title'});
	}
});
