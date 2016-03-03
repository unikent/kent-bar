var Backbone = require('exoskeleton');

var NV = require('backbone.nativeview');
Backbone.View = NV;
Backbone.ajax = require('backbone.nativeajax');

module.exports = Backbone.View.extend({
    renderContent: function (content) {
        "use strict";
        this.el.innerHTML = content;
    }
});