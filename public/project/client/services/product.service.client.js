"use strict";

(function () {
    angular
        .module("ShopaholicApp")
        .factory("ProductService" , productService);

    function productService($http) {

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


        function findProductsByTitle(title, callback)    {
            var searchParam = title;
            console.log(searchParam);
            $http.get("https://api.bestbuy.com/v1/products(name="+searchParam+"*&type!=movie&type!=music&type!=game&type!=BlackTie&type!=Software&productTemplate!=Accessories)?apiKey=ay4rd26c7bqjh9zutd5ynkm6&facet=customerReviewAverage&pageSize=20&format=json")
                .success(callback);
        }

        function browseProductsByCategory(category, callback)    {
            var categoryParam = category;
            $http.get("https://api.bestbuy.com/v1/products((categoryPath.id="+categoryParam+"*&type!=movie&type!=music&type!=game&type!=BlackTie&type!=Software&productTemplate!=Accessories))?apiKey=ay4rd26c7bqjh9zutd5ynkm6&facet=bestSellingRank&pageSize=20&format=json")
                .success(callback);
        }

        function findAllReviewsForProduct(productId){
            return $http.get("/api/project/product/"+productId);
        }

        function createReview(userId, productId, review) {
            console.log("In updateField - formId" +userId);
            console.log("In updateField - field object " +productId);
            return $http.post("/api/project/user/" +userId+ "/product/" +productId, review);
        }

        function selectedReview(reviewObj) {
            return $http.get("/api/project/review", reviewObj);
        }

        function updateReview(reviewObj) {
            return $http.put("/api/project/review", reviewObj);
        }

        function getIndexByUserUdAndProductId(userId, productId) {
            return $http.get("/api/project/user/" +userId+ "/product/" +productId);
        }

        function deleteReview(reviewId,productId, reviewObj){
            return $http.delete("/api/project/review/" +reviewId+ "/product/" +productId, reviewObj)
        }
    }
})();