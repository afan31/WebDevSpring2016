// pass db and mongoose reference to server side application module
module.exports = function(app, uuid, db, mongoose, userModel, securityService) {
    //var userModel    = require("./models/user.model.server.js")(db, mongoose);
    var formModel = require("./models/form.model.server.js")(db,mongoose);
    var fieldModel = require("./models/field.model.server.js")(formModel);

    var userService  = require("./services/user.service.server.js") (app, userModel,securityService);
    var formService = require("./services/form.service.server.js") (app, formModel);
    var fieldService = require("./services/field.service.server.js") (app, fieldModel);
}