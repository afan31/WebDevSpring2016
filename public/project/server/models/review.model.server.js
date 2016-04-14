//var mock = require("./product.mock.json");
//module.exports= function() {
//    var api = {
//        findAllReviewsForProduct: findAllReviewsForProduct,
//        createReview: createReview,
//        updateReview:updateReview,
//        getIndexByUserUdAndProductId: getIndexByUserUdAndProductId,
//        deleteReview: deleteReview
//    };
//    return api;


module.exports = function (uuid, mongoose) {
    //load user schema
    var ReviewSchema = require("./review.schema.server.js")(mongoose);

    //create low level mongoose user model
    var ReviewModel = mongoose.model('Shopaholic.review', ReviewSchema);

    var api = {
        findAllReviewsForProduct: findAllReviewsForProduct,
        addReview: addReview,
        deleteReview: deleteReview,
        updateReview: updateReview,
        findAllReviewsByUserId: findAllReviewsByUserId
    };
    return api;

    function findAllReviewsForProduct(productId) {
        console.log(productId);
        return ReviewModel.find({productId: productId});
    }

    function addReview(userId, productId, review) {
        console.log("IN REVIEW MODEL ", review);
        review.userId = userId;
        review.productId = productId;
        console.log("in model ", review);
        return ReviewModel.create(review);
    }

    function deleteReview(reviewId) {
        console.log("IN DELETE MODEL ", reviewId);
        return ReviewModel.remove({'_id': reviewId});
    }

    function updateReview(review) {
        console.log("Review is ",review);
        review.updatedOn = Date.now();
        return ReviewModel.update({$set: review});
    }

    function findAllReviewsByUserId(userId) {
        return ReviewModel.find({"userId": userId});
    }
};