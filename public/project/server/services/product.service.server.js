module.exports = function(app, productModel) {

    //app.get("/api/project/product?[title=title]", findProductsByTitle);
    //app.get("/api/project/product/:categoryId", browseProductsByCategory);
    app.get("/api/project/product/:productId", findAllReviewsForProduct);
    app.post("/api/project/user/:userId/product/:productId", createReview);
    app.get("/api/project/review", selectedReview);
    app.put("/api/project/review", updateReview);
    app.get("/api/project/user/:userId/product/:productId", getIndexByUserUdAndProductId);
    app.delete("/api/project/review/:reviewId/product/:productId", deleteReview);


    //function findProductsByTitle(req, res) {
    //    var searchParam =  req.query.title;
    //    var searchResuts = $http.get("https://api.bestbuy.com/v1/products(name="+searchParam+"*&type!=movie&type!=music&type!=game&type!=BlackTie&type!=Software&productTemplate!=Accessories)?apiKey=ay4rd26c7bqjh9zutd5ynkm6&facet=customerReviewAverage&pageSize=20&format=json");
    //    res.json(searchResuts);
    //}

    //function browseProductsByCategory(req, res){
    //    var categoryParam =  req.params.categoryId;
    //    console.log(categoryParam);
    //    var categoryResults = $http.get("https://api.bestbuy.com/v1/products((categoryPath.id="+categoryParam+"*&type!=movie&type!=music&type!=game&type!=BlackTie&type!=Software&productTemplate!=Accessories))?apiKey=ay4rd26c7bqjh9zutd5ynkm6&facet=bestSellingRank&pageSize=20&format=json");
    //    res.json(categoryResults);
    //}

    function findAllReviewsForProduct(req, res) {
        var productId = req.params.productId;
        var products = productModel.findAllReviewsForProduct(productId);
        res.json(products);
    }

    function createReview(req,res){
        var userId = req.params.userId;
        var productId = req.params.productId;
        var review =  req.body;
        var createdReview = productModel.createReview(userId, productId, review);
        res.json(createdReview);
    }

    function selectedReview(req, res) {
        var reviewSelected = req.body;
        res.json(reviewSelected);
    }

    function updateReview(req,res){
        var reviewForUpdate= req.body;
        var updatedReview = productModel.updateReview(reviewForUpdate);
        res.json(updatedReview);
    }

    function getIndexByUserUdAndProductId(req, res){
        var userId = req.params.userId;
        var productId = req.params.productId;
        var indexReturned = productModel.getIndexByUserUdAndProductId(userId, productId);
        res.json(indexReturned);
    }

    function deleteReview(req,res){
        var reviewId = req.params.reviewId;
        var productId = req.params.productId;
        var reviewObj = req.body;
        var reviewsArray = productModel.deleteReview(reviewId, productId, reviewObj);
        res.json(reviewsArray);
    }

}












//(function () {
//    angular
//        .module("ShopaholicApp")
//        .factory("ProductService", ProductService);
//
//    function ProductService($http) {
//
//
//        var api = {
//            findProductsByTitle: findProductsByTitle,
//            browseProductsByCategory: browseProductsByCategory,
//            findAllReviewsForProduct: findAllReviewsForProduct,
//            createReview: createReview,
//            selectedReview: selectedReview,
//            updateReview: updateReview,
//            getIndexByUserUdAndProductId : getIndexByUserUdAndProductId,
//            deleteReview : deleteReview
//        };
//        return api;
//
//        function findProductsByTitle(title, callback){
//            var searchParam = title;
//            $http.get("https://api.bestbuy.com/v1/products(name="+searchParam+"*&type!=movie&type!=music&type!=game&type!=BlackTie&type!=Software&productTemplate!=Accessories)?apiKey=ay4rd26c7bqjh9zutd5ynkm6&facet=customerReviewAverage&pageSize=20&format=json")
//                .success(callback);
//        }
//
//        function browseProductsByCategory(category, callback){
//            var categoryParam = category;
//            $http.get("https://api.bestbuy.com/v1/products((categoryPath.id="+categoryParam+"*&type!=movie&type!=music&type!=game&type!=BlackTie&type!=Software&productTemplate!=Accessories))?apiKey=ay4rd26c7bqjh9zutd5ynkm6&facet=bestSellingRank&pageSize=20&format=json")
//                .success(callback);
//        }
//
//
//        function findAllReviewsForProduct(productId){
//            var reviewParam = productId;
//            var toReturn = reviews.filter(function(review){
//                return (review.productId === reviewParam);
//            });
//            return toReturn;
//        }
//
//        function createReview(userId, productId, review) {
//            var currReview = {
//                "userId": userId,
//                "productId": productId,
//                "title": review.title,
//                "review": review.review,
//                "timestamp": new Date(),
//                "rating": 2
//
//            };
//            reviews.push(currReview);
//            review.title = null;
//            review.rating = null;
//            review.review = null;
//            review.user = null;
//            review.timestamp = null;
//            review.productId = null;
//
//            console.log(reviews);
//
//            return findAllReviewsForProduct(productId);
//        }
//
//        function selectedReview(userId, productId, reviewObj) {
//            return reviewObj;
//        }
//
//        function updateReview(review, callback)
//        {
//            var reviewIndex = findReviewIndexByReviewId(review._id);
//            console.log(reviewIndex);
//            reviews[reviewIndex] = {
//                "_id" : review._id,
//                "userId" : review.userId,
//                "title": review.title,
//                "review" : review.review,
//                "rating": review.rating,
//                "timestamp": new Date(),
//                "productId" : review.productId
//            };
//            console.log(reviews[reviewIndex]);
//            callback(reviews[reviewIndex]);
//        }
//
//        function findReviewIndexByReviewId(reviewId)
//        {
//            var index = 0;
//            for (var i = 0; i < reviews.length; i++) {
//                if(reviews[i]._id === reviewId) {
//                    return index;
//                }
//                index++;
//            }
//        }
//
//        function getIndexByUserUdAndProductId(userId, productId) {
//            for(var index in reviews){
//                if (reviews[index].productId === productId && reviews[index].userId === userId) {
//                    return index;
//                }
//            }
//        }
//
//        function deleteReview(reviewId,productId, reviewObj){
//            var index = getIndexByReviewId(reviewId);
//            reviews.splice(index,1);
//            return findAllReviewsForProduct(productId);
//        }
//
//        function getIndexByReviewId(reviewId) {
//            for(var index in reviews) {
//                if(reviews[index]._id === (reviewId + 1)) {
//                    return index;
//                }
//            }
//        }
//    }
//})();



