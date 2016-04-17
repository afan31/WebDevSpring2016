(function () {
    angular
        .module("ShopaholicApp")
        .controller("CategoryController", categoryController);

    function categoryController($routeParams, ProductService, $rootScope) {

        var vm = this;
        var catg = $routeParams.catg;
        vm.myPagingFunction = myPagingFunction;
        vm.browsebyCategory = browsebyCategory;
        vm.paginationCounter = 1;

        if (catg) {
            myPagingFunction();
            browsebyCategory($routeParams.catg, vm.paginationCounter);
        }

        function myPagingFunction() {
            if (vm.paginationCounter == 1) {
                vm.paginationCounter = vm.paginationCounter + 1;
            }
            else {
                if ($routeParams.catg) {
                    vm.busy = true;
                    ProductService
                        .browseProductsByCategory(
                            $routeParams.catg,
                            vm.paginationCounter,
                            function (response) {
                                if (response.products) {
                                    vm.categoryData.products.push.apply(vm.categoryData.products, response.products);
                                    vm.busy = false;
                                }
                            });
                }
            }
        }

        function browsebyCategory(catg, pageSize) {
            var categoryParam = catg;
            //console.log("https://api.bestbuy.com/v1/products((search="+searchParam+"))?apiKey=ay4rd26c7bqjh9zutd5ynkm6&format=json" );
            ProductService.browseProductsByCategory(categoryParam, pageSize, render);
        }

        function render(response) {
            console.log(response);
            vm.categoryData = response;

        }
    }
})();