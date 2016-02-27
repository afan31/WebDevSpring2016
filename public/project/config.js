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
                templateUrl: "search.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();