// pass db and mongoose reference to server side application module
module.exports = function(app, uuid) {
    var userModel    = require("./models/user.model.js")(uuid);
    var productModel = require("./models/product.model.js")(uuid);
    //var fieldModel = require("./models/field.model.server.js")(uuid);

    var userService  = require("./services/user.service.server.js") (app, userModel);
    var productService = require("./services/product.service.server.js") (app, productModel);
    //var fieldService = require("./services/field.service.server.js") (app, fieldModel);
}