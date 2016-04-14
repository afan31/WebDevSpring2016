// pass db and mongoose reference to server side application module
module.exports = function(app, uuid,db, mongoose) {
    var userModel    = require("./models/user.model.server.js")(uuid, db, mongoose);
    var productModel = require("./models/product.model.server.js")(uuid, db,mongoose);
    var reviewModel = require("./models/review.model.server.js")(uuid,db,mongoose);

    var userService  = require("./services/user.service.server.js") (app, userModel, productModel);
    var productService = require("./services/product.service.server.js") (app, productModel);
    var reviewService = require("./services/review.service.server.js") (app, reviewModel);
}
