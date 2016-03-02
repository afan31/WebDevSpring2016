(function () {
    angular
        .module("ShopaholicApp")
        .factory("ProductService", ProductService);

    function ProductService($http) {
        var api = {
            findProductsByTitle: findProductsByTitle,
            //findProductBySkuId: findProductBySkuId,
            browseProductsByCategory: browseProductsByCategory
        };
        return api;

        function findProductsByTitle(title, callback){
            var searchParam = title;
            $http.get("https://api.bestbuy.com/v1/products((search="+searchParam+"))?apiKey=ay4rd26c7bqjh9zutd5ynkm6&facet=customerReviewAverage&pageSize=20&format=json")
                .success(callback);
        }

        //function findProductBySkuId(skuId){
        //
        //}

        function browseProductsByCategory(category, callback){
            var categoryParam = category;
            //alert("IN product service "+categoryParam);
            $http.get("https://api.bestbuy.com/v1/products((categoryPath.id="+categoryParam+"))?apiKey=ay4rd26c7bqjh9zutd5ynkm6&facet=bestSellingRank&pageSize=20&format=json")
                .success(callback);
        }
    }
})();