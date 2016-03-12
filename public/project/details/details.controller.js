(function () {
    angular
        .module("ShopaholicApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, $http, $scope, ProductService, UserService) {
        var skuId = $routeParams.skuId;

        $http.get("http://api.bestbuy.com/v1/products/" + skuId + ".json?apiKey=ay4rd26c7bqjh9zutd5ynkm6")
            .success(renderProduct);

        //$http.get("http://api.bestbuy.com/v1/reviews(sku="+skuId+")?format=json&apiKey=ay4rd26c7bqjh9zutd5ynkm6")
        //    .success(renderReview);


        $scope.callUpdate = callUpdate;
        renderReview(skuId);
        $scope.addReview = addReview;
        $scope.selectedReview = selectedReview;
        $scope.updateReview = updateReview;
        $scope.deleteReview = deleteReview;
        $scope.cancelReview = cancelReview;
        $scope.findUserFirstNameByUserId = findUserFirstNameByUserId;


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

        function addReview(reviewObject) {
            $scope.show = true;
            $scope.reviewsData = ProductService.createReview(234, $routeParams.skuId, reviewObject);
        }

        function selectedReview(ratingIndex) {
            $scope.selectedIndex = ratingIndex;
            //var editReview = ProductService.selectedReview(234,$routeParams.skuId,reviewObject);
            var editReview = {
                "_id": $scope.reviewsData[ratingIndex]._id,
                "userId": $scope.reviewsData[ratingIndex].userId,
                "title": $scope.reviewsData[ratingIndex].title,
                "review": $scope.reviewsData[ratingIndex].review,
                "rating": $scope.reviewsData[ratingIndex].rating,
                "productId": $scope.reviewsData[ratingIndex].productId
            }

            console.log(editReview);

            $scope.review = editReview;
        }

        function updateReview(review) {
            ProductService.updateReview(review, function (newReview) {
                $scope.reviewsData[$scope.selectedIndex] = newReview;
                $scope.selectedIndex = -1;
                $scope.review = {};
            });
        }

        function deleteReview(reviewId, reviewObject) {
            $scope.reviewsData = ProductService.deleteReview(reviewId, $routeParams.skuId, reviewObject);
            $scope.review = null;
        }

        function cancelReview(reviewIndex) {
            $scope.selectedIndex = reviewIndex;
            $scope.selectedIndex = -1;
            $scope.review = null;
        }

        function findUserFirstNameByUserId(userId)
        {
            var userFirstName;
            UserService.findUserFirstNameByUserId(userId, function(response){
                userFirstName = response;
            });

            return userFirstName;
        }

    }
})();