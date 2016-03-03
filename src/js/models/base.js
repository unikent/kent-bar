var Backbone = require('exoskeleton'),
    api = require('../lib/api-base');

module.exports = Backbone.Model.extend({
    apiBase: api.get()
});