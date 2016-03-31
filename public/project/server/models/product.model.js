var mock = require("./product.mock.json");
module.exports= function() {
    var api = {
        findAllReviewsForProduct: findAllReviewsForProduct,
        createReview: createReview,
        updateReview:updateReview,
        getIndexByUserUdAndProductId: getIndexByUserUdAndProductId,
        deleteReview: deleteReview
    };
    return api;



    function findAllReviewsForProduct(productId){
            var reviewParam = productId;
            var toReturn = mock.filter(function(review){
                return (review.productId === reviewParam);
            });
            return toReturn;
    }


     function createReview(userId, productId, review) {
            var currReview = {
                "userId": userId,
                "productId": productId,
                "title": review.title,
                "review": review.review,
                "timestamp": new Date(),
                "rating": 2

            };
            mock.push(currReview);
            review.title = null;
            review.rating = null;
            review.review = null;
            review.user = null;
            review.timestamp = null;
            review.productId = null;

            console.log(mock);

            return findAllReviewsForProduct(productId);
     }

    function updateReview(review) {
            var reviewIndex = findReviewIndexByReviewId(review._id);
            console.log(reviewIndex);
            mock[reviewIndex] = {
                "_id" : review._id,
                "userId" : review.userId,
                "title": review.title,
                "review" : review.review,
                "rating": review.rating,
                "timestamp": new Date(),
                "productId" : review.productId
            };
            console.log(mock[reviewIndex]);
            return mock[reviewIndex];
    }


    function findReviewIndexByReviewId(reviewId) {
            var index = 0;
            for (var i = 0; i < mock.length; i++) {
                if(mock[i]._id === reviewId) {
                    return index;
                }
                index++;
            }
    }


    function getIndexByUserUdAndProductId(userId, productId) {
            for(var index in mock){
                if (mock[index].productId === productId && mock[index].userId === userId) {
                    return index;
                }
            }
    }


    function deleteReview(reviewId,productId, reviewObj){
            var index = getIndexByReviewId(reviewId);
            mock.splice(index,1);
            return findAllReviewsForProduct(productId);
    }


    function getIndexByReviewId(reviewId) {
            for(var index in mock) {
                if(mock[index]._id === (reviewId + 1)) {
                    return index;
                }
            }
    }


}