'use strict';

(function () {
    angular
        .module('ShopaholicApp')
        .controller('SearchController', searchController);


    function searchController($routeParams,ProductService, $rootScope, $location) {
        var vm = this;
        //console.log("Route PArams ",$routeParams.title);
        vm.myPagingFunction = myPagingFunction;
        vm.searchParam = $routeParams.title;
        vm.search = search;
        vm.searchOnEnter = searchOnEnter;
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
            console.log("THIS IS ", vm.searchParam);
            var apiKey ="ay4rd26c7bqjh9zutd5ynkm6";
            //alert("IN SEARCH FUNCTION");
            ProductService
                .findProductsByTitle(vm.searchParam,1, render);
        }

        function render(response){
            $rootScope.data=response;
        }

        function searchOnEnter(event, title) {
            if (event.keyCode === 13) {
                $location.url("/search/"+title);
                search();
                //$state.go("home.result", {keyword: keyword, isCategory: false});
            }
        }
    }
})();