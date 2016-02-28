(function () {
    angular
        .module("ShopaholicApp")
        .controller("SearchController", searchController);

    function searchController($location, $scope, $http, $routeParams, ProductService) {

        var apiKey ="ay4rd26c7bqjh9zutd5ynkm6";
        var title = $routeParams.title;

        if (title){
            search(title);
        }

        //event handler declaration
        $scope.search = search;

        //event handler implementations
        function search(title){
            console.log(title);
            $location.url("/search/"+title);
            var searchParam = title;
            //console.log("https://api.bestbuy.com/v1/products((search="+searchParam+"))?apiKey=ay4rd26c7bqjh9zutd5ynkm6&format=json" );
            ProductService.findProductsByTitle(searchParam, render);
        }

        function render(response){
            //console.log(response);

            $scope.data=response;


        }
    }
})();