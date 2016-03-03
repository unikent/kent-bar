var BaseView = require('./base'),
    template = require('../templates/bar.hbs');

module.exports = BaseView.extend({

    render: function () {
        "use strict";
        this.renderContent(template());
    }
});