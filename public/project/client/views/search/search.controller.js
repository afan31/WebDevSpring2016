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


    function searchController(ProductService, $rootScope) {
        var vm = this;

       // var title = $routeParams.title;
        //console.log("Search Parameter ",title);

        vm.search = search;

        function init() {
            //if (title){
            //    search(title);
            //}
        }
        init();

        //function loginController(UserService, $location){
        //    var vm = this;
        //
        //    vm.login = login;
        //
        //    function init() {
        //    }
        //    init();

        function search(title) {
            var apiKey ="ay4rd26c7bqjh9zutd5ynkm6";
            alert("IN SEARCH FUNCTION");
            console.log(title);
            var searchParam = title;
            ProductService
                .findProductsByTitle(searchParam, render);
                //.then(function(response){
                //    vm.search = response.data;
                //});
        }

        function render(response){
            console.log(response);
            vm = response.data;
            $rootScope.data=response;

        }
    }
})();