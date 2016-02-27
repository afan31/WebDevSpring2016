(function () {
    angular
        .module("ShopaholicApp")
        .controller("NavController", NavController);

    function NavController($location, $scope) {
        $scope.location = $location;
    }
})();