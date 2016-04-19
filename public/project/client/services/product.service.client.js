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
            addProd : addProd,
            findProdById: findProdById
        };
        return api;


        function findProductsByTitle(title,pageSize, callback)    {
            var searchParam = title;
            console.log(pageSize);
            $http.get("https://api.bestbuy.com/v1/products(name="+searchParam+"*&type!=movie&type!=music&type!=game&type!=BlackTie&type!=Software&productTemplate!=Accessories)?apiKey=ay4rd26c7bqjh9zutd5ynkm6&facet=customerReviewAverage&format=json&page="+pageSize)
                .success(callback);
        }

        function browseProductsByCategory(category,pageSize, callback)    {
            var categoryParam = category;
            var pageParam = pageSize;
            $http.get("https://api.bestbuy.com/v1/products((categoryPath.id="+categoryParam+"*&type!=movie&type!=music&type!=game&type!=BlackTie&type!=Software&productTemplate!=Accessories))?apiKey=ay4rd26c7bqjh9zutd5ynkm6&facet=bestSellingRank&pageSize=20&format=json&page="+pageParam)
                .success(callback);
        }

        function getIndexByUserUdAndProductId(userId, productId) {
            return $http.get("/api/project/user/" +userId+ "/product/" +productId);
        }

        function addProd(prod){
            console.log("in client ", prod);
            return $http.post("/api/project/product",prod);
        }

        function findProdById(productId){
            console.log("In client service ",productId);
            return $http.get("/api/project/product/"+productId);
        }
    }
})();