"use strict";
module.exports = function (app, productModel) {
    app.post("/api/project/product", addProduct);

    function addProduct(req, res){
        var prod = req.body;
        productModel
            .addProd(prod)
            .then(function (resposne) {
                res.json(resposne);

            }, function (error) {
                res.status (400).send ("Error in adding restaurant to restaurant collection", error.statusText);
            })
    }


};