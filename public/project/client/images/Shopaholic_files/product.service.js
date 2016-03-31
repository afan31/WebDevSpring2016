(function () {
    angular
        .module("ShopaholicApp")
        .factory("ProductService", ProductService);

    function ProductService($http) {
        var api = {
            findProductsByTitle: findProductsByTitle,
            findProductBySkuId: findProductBySkuId
        };
        return api;

        function findProductsByTitle(title, callback){
            var searchParam = title;
            $http.get("https://api.bestbuy.com/v1/products((search="+searchParam+"))?apiKey=ay4rd26c7bqjh9zutd5ynkm6&format=json")
                .success(callback);
        }

        function findProductBySkuId(skuId){

        }
    }
})();