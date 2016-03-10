(function () {
    angular
        .module("ShopaholicApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, $http, $scope, ProductService, $location) {
        var skuId = $routeParams.skuId;

        $http.get("http://api.bestbuy.com/v1/products/" + skuId + ".json?apiKey=ay4rd26c7bqjh9zutd5ynkm6")
            .success(renderProduct);

        //$http.get("http://api.bestbuy.com/v1/reviews(sku="+skuId+")?format=json&apiKey=ay4rd26c7bqjh9zutd5ynkm6")
        //    .success(renderReview);



        $scope.callUpdate = callUpdate;
        renderReview(skuId);
        $scope.addReview = addReview;
        $scope.selectedReview = selectedReview;
        $scope.deleteReview = deleteReview;


        function callUpdate() {
            $('.star-rating').raty({
                path: 'images/',
                score: function () {
                    return $(this).attr('data-score');
                }
            });
        }

        function renderProduct(response) {
            $scope.product = response;
        }

        function renderReview(skuId) {
            $scope.reviewsData = ProductService.findAllReviewsForProduct(skuId);
            console.log($scope.reviewsData);
        }

        function addReview(reviewObject){
            $scope.reviewsData = ProductService.createReview(234,$routeParams.skuId,reviewObject);
        }

        function selectedReview(reviewObject){
            $scope.review = ProductService.selectedReview(234,$routeParams.skuId,reviewObject);
        }

        function deleteReview(reviewId, reviewObject){
            $scope.reviewsData = ProductService.deleteReview(reviewId,$routeParams.skuId,reviewObject);
        }

    }
})();