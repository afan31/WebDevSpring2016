"use strict";

(function () {
    angular
        .module("ShopaholicApp")
        .factory("ProductService" , productService);

    function productService($http) {

        var api = {
            findProductsByTitle: findProductsByTitle,
            browseProductsByCategory: browseProductsByCategory,
            getIndexByUserUdAndProductId : getIndexByUserUdAndProductId,
            addProd : addProd
        };
        return api;


        function findProductsByTitle(title, callback)    {
            var searchParam = title;
            console.log(searchParam);
            $http.get("https://api.bestbuy.com/v1/products(name="+searchParam+"*&type!=movie&type!=music&type!=game&type!=BlackTie&type!=Software&productTemplate!=Accessories)?apiKey=ay4rd26c7bqjh9zutd5ynkm6&facet=customerReviewAverage&pageSize=20&format=json")
                .success(callback);
        }

        function browseProductsByCategory(category, callback)    {
            var categoryParam = category;
            $http.get("https://api.bestbuy.com/v1/products((categoryPath.id="+categoryParam+"*&type!=movie&type!=music&type!=game&type!=BlackTie&type!=Software&productTemplate!=Accessories))?apiKey=ay4rd26c7bqjh9zutd5ynkm6&facet=bestSellingRank&pageSize=20&format=json")
                .success(callback);
        }

        function getIndexByUserUdAndProductId(userId, productId) {
            return $http.get("/api/project/user/" +userId+ "/product/" +productId);
        }

        function addProd(prod){
            $http.post("/api/project/restaurant",prod);
        }
    }
})();