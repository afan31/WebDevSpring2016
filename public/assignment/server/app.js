// pass db and mongoose reference to server side application module
module.exports = function(app) {
    var userModel    = require("./models/user.model.js")();

    var userService  = require("./services/user.service.server.js") (app, userModel);
}