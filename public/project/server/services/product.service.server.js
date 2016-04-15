"use strict";
module.exports = function (app, productModel) {
    app.post("/api/project/product", addProduct);
    app.get("/api/project/product/:productId", findProductById);

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

    function findProductById(req, res){
        var productId = req.params.productId;
        console.log("Product Id is ", productId);
        productModel
            .findProdById(productId)
            .then(function (response) {
                console.log("FIND PRODUCT BY ID ",response);
                res.json(response);

            }, function (error) {
                res.status (400).send ("Error in adding restaurant to restaurant collection", error.statusText);
            })
    }


};