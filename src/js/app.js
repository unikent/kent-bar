var Backbone = require('exoskeleton');
var Bar = require('./views/bar.js');

var NV = require('backbone.nativeview');
Backbone.View = NV;
Backbone.ajax = require('backbone.nativeajax');

var app = {
    init: function () {
        "use strict";

        var container = window.KENT.kentbar.config.target,
            app = this;

        document.addEventListener('DOMContentLoaded', function () {
            var bar, barEl;

            if (container === false) {
                barEl = document.createElement('div');
                barEl.id = "kentBar";
                document.body.insertBefore(barEl, document.body.childNodes[0]);
                container = '#kentBar';
            }

            bar = new Bar({el: container});
            bar.render();
            app.insertStyles();
            Backbone.history.start();
        });
    },

    insertStylesheet : function(url, title) {
        var l = document.createElement("link");
        l.setAttribute("rel", "stylesheet");
        l.setAttribute("type", "text/css");
        l.setAttribute("title", title);
        l.href = url;
        document.getElementsByTagName('head')[0].appendChild(l);
    },

    insertStyles: function(){
        var url, s;
        for( s in window.KENT.kentbar.config.styles){
            if(window.KENT.kentbar.config.styles.hasOwnProperty(s)){
                if(window.KENT.kentbar.config.styles[s]){
                    if(window.KENT.kentbar.config.styles[s]===true){
                        if(typeof window.KENT.kentbar.styles[s] !=='undefined'){
                            this.insertStylesheet(window.KENT.kentbar.styles[s],s);
                        }
                    }else{
                        this.insertStylesheet(window.KENT.kentbar.config.styles[s],s)
                    }
                }

            }
        }
    }
};

window.KENT  = window.KENT || {};
window.KENT.kentbar  = window.KENT.kentbar || {};

window.KENT.kentbar.defaults = {
    target: false,
    components: [
        'student',
        'staff',
        'departments',
        'alumni'
    ],
    custom_link: false,
    styles:{
        kentfont:true,
        fonts:true,
        base:true
    }
};

window.KENT.kentbar.styles = {
    kentfont:'https://static.kent.ac.uk/pantheon/static/webfonts/kentfont/css/kentfont.css',
    fonts:'https://beta.kent.ac.uk/assets/fonts/arial-light.css',
    base: '/main.css'
};

if(typeof window.KENT.kentbar.config ==='object'){
    for(var i in window.KENT.kentbar.defaults){
        if(window.KENT.kentbar.defaults.hasOwnProperty(i)) {
            if (typeof window.KENT.kentbar.config[i] === 'undefined') {
                window.KENT.kentbar.config[i] = window.KENT.kentbar.defaults[i];
            }
        }
    }
}else {
    window.KENT.kentbar.config = window.KENT.kentbar.defaults;
}

window.KENT.kentbar.app = app;

module.exports = app;
app.init();