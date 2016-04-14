(function () {
    angular
        .module("ShopaholicApp")
        .controller("CategoryController", categoryController);

    function categoryController($routeParams, ProductService, $rootScope) {

        var vm  =this;
        var catg = $routeParams.catg;
        //console.log(catg);
        if (catg){
            browsebyCategory($routeParams.catg);
        }

        //event handler declaration
        vm.browsebyCategory = browsebyCategory;

        //alert($routeParams.catg);

        //event handler implementations
        function browsebyCategory(catg){
            var categoryParam = catg;
            //console.log("https://api.bestbuy.com/v1/products((search="+searchParam+"))?apiKey=ay4rd26c7bqjh9zutd5ynkm6&format=json" );
            ProductService.browseProductsByCategory(categoryParam, render);
        }

        function render(response){
            console.log(response);
            vm.categoryData=response;

        }
    }
})();