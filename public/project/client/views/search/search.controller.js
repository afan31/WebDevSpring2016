//(function () {
//    angular
//        .module("ShopaholicApp")
//        .controller("SearchController", searchController);
//
//    function searchController($location, $scope, $http, $routeParams, ProductService, $rootScope) {
//
//        var apiKey ="ay4rd26c7bqjh9zutd5ynkm6";
//        var title = $routeParams.title;
//        console.log(title);
//        if (title){
//            search(title);
//        }
//
//        //event handler declaration
//        $scope.search = search;
//
//        //event handler implementations
//        function search(title){
//            console.log(title);
//            $location.url("/search/"+title);
//            var searchParam = title;
//            //console.log("https://api.bestbuy.com/v1/products((search="+searchParam+"))?apiKey=ay4rd26c7bqjh9zutd5ynkm6&format=json" );
//            ProductService.findProductsByTitle(searchParam, render);
//        }
//
//        function render(response){
//            console.log(response);
//            $rootScope.data=response;
//        }
//    }
//})();


'use strict';

(function () {
    angular
        .module('ShopaholicApp')
        .controller('SearchController', searchController);


    function searchController($routeParams,ProductService, $rootScope, $location) {
        var vm = this;
        console.log("Route PArams ",$routeParams.title);
        vm.myPagingFunction = myPagingFunction;
        vm.searchParam = $routeParams.title;
        vm.search = search;
        vm.paginationCounter = 1;




        function init() {
            if (vm.searchParam){
                search();
            }
        }
        init();

        function myPagingFunction() {
            console.log("Here");
            if (vm.paginationCounter == 1) {
                vm.paginationCounter = vm.paginationCounter + 1;
            }
            else {
                if (vm.searchParam) {
                    vm.busy = true;
                    ProductService
                        .findProductsByTitle(
                            vm.searchParam,
                            vm.paginationCounter,
                            function (response) {
                                if (response.products) {
                                    $rootScope.data.products.push.apply($rootScope.data.products, response.products);
                                    vm.busy = false;
                                }
                            });
                }
            }
        }


        function search() {
            var apiKey ="ay4rd26c7bqjh9zutd5ynkm6";
            //alert("IN SEARCH FUNCTION");
            ProductService
                .findProductsByTitle(vm.searchParam,1, render);
        }

        function render(response){
            console.log(response);
            console.log(vm.searchParam);
            //vm = response.data;
            $rootScope.data=response;
            //$location.url('/search/'+vm.searchParam);

        }
    }
})();