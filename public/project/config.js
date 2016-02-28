'use strict';

(function () {
    angular
        .module('ShopaholicApp')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home.view.html"
            })
            .when("/search", {
                templateUrl: "search/search.view.html",
                controller: "SearchController"
            })
            .when("/search/:title", {
                templateUrl: "search/search.view.html",
                controller: "SearchController"
            })
            .when("/details/:skuId", {
                templateUrl: "details/details.view.html",
                controller: "DetailsController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();