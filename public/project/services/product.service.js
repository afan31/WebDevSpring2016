(function () {
    angular
        .module("ShopaholicApp")
        .factory("ProductService", ProductService);

    function ProductService($http) {

        var reviews = [
            {
                "_id" : 1,
                "userId" : 234,
                "title": "This is a test title 1",
                "review" : "This is a test review for macbook pro. Product ID: 1219696697139",
                "rating": 4,
                "timestamp": "Mar 8, 2016",
                "productId" : "7639085"},

            {
                "_id" : 2,
                "userId" : 345,
                "title": "This is a test title 2",
                "review" : "This is a test review for macbook pro. Product ID: 1219696697139",
                "rating": 4,
                "timestamp": "Mar 9, 2016",
                "productId" : "7639085"}
        ];

        var api = {
            findProductsByTitle: findProductsByTitle,
            browseProductsByCategory: browseProductsByCategory,
            findAllReviewsForProduct: findAllReviewsForProduct,
            createReview: createReview,
            selectedReview: selectedReview,
            updateReview: updateReview,
            getIndexByUserUdAndProductId : getIndexByUserUdAndProductId,
            deleteReview : deleteReview
        };
        return api;

        function findProductsByTitle(title, callback){
            var searchParam = title;
            $http.get("https://api.bestbuy.com/v1/products(name="+searchParam+"*&type!=movie&type!=music&type!=game&type!=BlackTie&type!=Software&productTemplate!=Accessories)?apiKey=ay4rd26c7bqjh9zutd5ynkm6&facet=customerReviewAverage&pageSize=20&format=json")
                .success(callback);
        }

        function browseProductsByCategory(category, callback){
            var categoryParam = category;
            $http.get("https://api.bestbuy.com/v1/products((categoryPath.id="+categoryParam+"*&type!=movie&type!=music&type!=game&type!=BlackTie&type!=Software&productTemplate!=Accessories))?apiKey=ay4rd26c7bqjh9zutd5ynkm6&facet=bestSellingRank&pageSize=20&format=json")
                .success(callback);
        }


        function findAllReviewsForProduct(productId){
            var reviewParam = productId;
            var toReturn = reviews.filter(function(review){
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
            reviews.push(currReview);
            review.title = null;
            review.rating = null;
            review.review = null;
            review.user = null;
            review.timestamp = null;
            review.productId = null;

            console.log(reviews);

            return findAllReviewsForProduct(productId);
        }

        function selectedReview(userId, productId, reviewObj) {
            return reviewObj;
        }

        function updateReview(review, callback)
        {
            var reviewIndex = findReviewIndexByReviewId(review._id);
            console.log(reviewIndex);
            reviews[reviewIndex] = {
                "_id" : review._id,
                "userId" : review.userId,
                "title": review.title,
                "review" : review.review,
                "rating": review.rating,
                "timestamp": new Date(),
                "productId" : review.productId
            };
            console.log(reviews[reviewIndex]);
            callback(reviews[reviewIndex]);
        }

        function findReviewIndexByReviewId(reviewId)
        {
            var index = 0;
            for (var i = 0; i < reviews.length; i++) {
                if(reviews[i]._id === reviewId) {
                    return index;
                }
                index++;
            }
        }

        function getIndexByUserUdAndProductId(userId, productId) {
            for(var index in reviews){
                if (reviews[index].productId === productId && reviews[index].userId === userId) {
                    return index;
                }
            }
        }

        function deleteReview(reviewId,productId, reviewObj){
            var index = getIndexByReviewId(reviewId);
            reviews.splice(index,1);
            return findAllReviewsForProduct(productId);
        }

        function getIndexByReviewId(reviewId) {
            for(var index in reviews) {
                if(reviews[index]._id === (reviewId + 1)) {
                    return index;
                }
            }
        }
    }
})();

