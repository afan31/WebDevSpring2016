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
    console.log(prodObj);
        return Product.findOneAndUpdate({'_id':prod.sku},prodObj,{upsert:true});
    }

    function findProdById(prodId){
        return Product.findById(prodId);
    }

    function findAllProduct(likeList){
        console.log("Like-list", likeList);
        return Product.find({'_id':{$in:likeList}});
    }



    //function userLikesProduct (userId, product) {
    //
    //    var deferred = q.defer();
    //
    //    // find the movie by imdb ID
    //    Product.findOne({productId: product.productId},
    //
    //        function (err, doc) {
    //
    //            // reject promise if error
    //            if (err) {
    //                deferred.reject(err);
    //            }
    //
    //            // if there's a movie
    //            if (doc) {
    //                // add user to likes
    //                doc.likes.push (userId);
    //                // save changes
    //                doc.save(function(err, doc){
    //                    if (err) {
    //                        deferred.reject(err);
    //                    } else {
    //                        deferred.resolve(doc);
    //                    }
    //                });
    //            } else {
    //                // if there's no movie
    //                // create a new instance
    //                product = new Product(product);
    //                // add user to likes
    //                product.likes.push (userId);
    //                // save new instance
    //                product.save(function(err, doc) {
    //                    if (err) {
    //                        deferred.reject(err);
    //                    } else {
    //                        deferred.resolve(doc);
    //                    }
    //                });
    //            }
    //        });
    //
    //    return deferred.promise;
    //}
    //
    //function findProductsByProductIDs (productIds) {
    //    var products = [];
    //    for (var id in productIds) {
    //        var product = findProductByProductID(productIds[id]);
    //        if (product) {
    //            products.push({
    //                _id: product._id,
    //                title: product.title,
    //                poster: product.poster,
    //                productId: product.productId
    //            });
    //        }
    //    }
    //    return products;
    //}
    //
    //function createProduct(product) {
    //    product = {
    //        _id: "ID_" + (new Date()).getTime(),
    //        productId: product.productId,
    //        poster: product.poster,
    //        title: product.title
    //    };
    //    products.push(movie);
    //    return product;
    //}
    //
    //function findProductByProductID(productId) {
    //    for(var p in products) {
    //        if(products[p].productId === productId) {
    //            return products[p];
    //        }
    //    }
    //    return null;
    //}
}