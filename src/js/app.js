var Backbone = require('exoskeleton');
var Bar = require('./views/bar.js');

var NV = require('backbone.nativeview');
Backbone.View = NV;
Backbone.ajax = require('backbone.nativeajax');

var app = {
    init: function () {
        "use strict";

        var container = window.KENT.kentbar.config.target;

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

            Backbone.history.start();
        });
    }
};

window.KENT  = window.KENT || {};
window.KENT.kentbar  = window.KENT.kentbar || {};

window.KENT.kentbar.config = window.KENT.kentbar.config || {
    target: false,
    links: [
        'student',
        'staff',
        'departments',
        'alumni'
    ]
};
window.KENT.kentbar.app = app;

module.exports = app;
app.init();