(function () {
    angular
        .module("ShopaholicApp")
        .controller("ProjectMainController", projectMainController);

    function projectMainController($location, $scope) {
        $scope.location = $location;
    }
})();