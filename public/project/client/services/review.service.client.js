"use strict";

(function () {
    angular
        .module("ShopaholicApp")
        .factory("ReviewService" , reviewService);

    function reviewService($http) {

        var api = {
            createReview: createReview,
            selectedReview: selectedReview,
            updateReview: updateReview,
            deleteReview : deleteReview,
            findAllReviewsForProduct: findAllReviewsForProduct,
            findAllReviewsForUser: findAllReviewsForUser
        };
        return api;


        function findAllReviewsForProduct(productId){
            console.log("in client review " ,productId);
            return $http.get("/api/project/product/review/"+productId);
        }

        function findAllReviewsForUser(userId){
            console.log("in client review user Id" ,userId);
            return $http.get("/api/project/review/"+userId);
        }

        function createReview(userId, productId, review) {
            //console.log("In updateField " +userId);
            return $http.post("/api/project/user/" +userId+ "/product/" +productId, review);
        }

        function selectedReview(reviewObj) {
            return $http.get("/api/project/review", reviewObj);
        }

        function updateReview(reviewObj) {
            console.log("Client review ",reviewObj);
            return $http.put("/api/project/review", reviewObj);
        }

        function deleteReview(reviewId){
            console.log(reviewId);
            return $http.delete("/api/project/review/" +reviewId+ "/product/");
        }

    }
})();