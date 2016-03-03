module.exports = {
    get: function () {
        "use strict";
        return this.getFromHostname(window.location.hostname);
    },
    getFromHostname: function (hostname) {
        "use strict";
        switch (hostname) {
        case 'localhost':
            return 'http://localhost/api.kent/public'; // Set to local API port
        default:
            return 'https://api.kent.ac.uk/api'; // Set to production API
        }
    }
};


