(function () {
    angular
        .module("ShopaholicApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, $http, $scope) {
        var skuId = $routeParams.skuId;
        //var apiKey = ay4rd26c7bqjh9zutd5ynkm6
        $http.get("http://api.bestbuy.com/v1/products/" + skuId + ".json?apiKey=ay4rd26c7bqjh9zutd5ynkm6")
            .success(renderProduct);

        $http.get("http://api.bestbuy.com/v1/reviews(sku="+skuId+")?format=json&apiKey=ay4rd26c7bqjh9zutd5ynkm6")
            .success(renderReview);



        $scope.callUpdate = callUpdate;

        function callUpdate() {

            $('.star-rating').raty({
                path: 'images/',
                readOnly: true,
                score: function () {
                    return $(this).attr('data-score');
                }
            });
        }


        function renderProduct(response) {
            $scope.product = response;
        }

        function renderReview(response) {
            //console.log(response);
            $scope.dataReview = response;
            console.log($scope.dataReview);

            console.log($);





        }



    }
})();