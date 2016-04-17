// pass db and mongoose reference to model
module.exports = function(db, mongoose) {

    var ProductSchema = require("./product.schema.server.js")(mongoose);

    // create movie from schema
    var Product  = mongoose.model("Product", ProductSchema);

    var products = [];
    var api = {
        addProd: addProd,
        findProdById: findProdById,
        findAllProduct: findAllProduct
    };
    return api;

    function addProd(prod){
        //console.log("Product is" ,prod);
        var prodObj = {
            "_id":prod.sku,
            "name":prod.name,
            "imageUrl": prod.thumbnailImage
        };
    //console.log(prodObj);
        return Product.findOneAndUpdate({'_id':prod.sku},prodObj,{upsert:true});
    }

    function findProdById(prodId){
        return Product.findById(prodId);
    }

    function findAllProduct(likeList){
        //console.log("Like-list", likeList);
        return Product.find({'_id':{$in:likeList}});
    }
}