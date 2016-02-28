'use strict';

(function () {
    angular
        .module('ShopaholicApp')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/carousel/carousel.view.html"
            })
            .when("/search", {
                templateUrl: "search/search.view.html",
                controller: "SearchController"
            })
            .when("/search/:title", {
                templateUrl: "search/search.view.html",
                controller: "SearchController"
            })
            .when("/browse", {
                templateUrl: "category/category.view.html",
                controller: "CategoryController"
            })
            .when("/browse/:catg", {
                templateUrl: "category/category.view.html",
                controller: "CategoryController"
            })
            .when("/details/:skuId", {
                templateUrl: "details/details.view.html",
                controller: "DetailsController"
            })
            .otherwise({
                redirectTo: "/home",
                templateUrl: "views/carousel/carousel.view.html"
            });
    }
})();