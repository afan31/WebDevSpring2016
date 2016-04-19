var q = require("q");

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
        console.log("HERE IN findAllReviewsForProduct", productId);
        return ReviewModel.find({productId: productId});
    }

    function addReview(userId, productId, review) {
       // console.log("IN REVIEW MODEL ", review);
        review.userId = userId;
        review.productId = productId;
       // console.log("in model ", review);
        return ReviewModel.create(review);
    }

    function deleteReview(reviewId) {
        //console.log("IN DELETE MODEL ", reviewId);
        return ReviewModel.remove({'_id': reviewId});
    }

    function updateReview(review) {
        var id = review._id;
        delete review._id;
        var deferred = q.defer();
        return ReviewModel
            .update(
                {_id: id},
                {$set: review}
            );
    }

        function findAllReviewsByUserId(userId) {
        return ReviewModel.find({"userId": userId});
    }

};