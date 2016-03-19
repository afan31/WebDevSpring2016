// pass db and mongoose reference to server side application module
module.exports = function(app, uuid) {
    var userModel    = require("./models/user.model.js")(uuid);
    var formModel = require("./models/form.model.js")(uuid);
    var fieldModel = require("./models/field.model.js")(uuid);

    var userService  = require("./services/user.service.server.js") (app, userModel);
    var formService = require("./services/form.service.server.js") (app, formModel);
    var fieldService = require("./services/field.service.server.js") (app, fieldModel);
}