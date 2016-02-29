'use strict';

(function () {
    angular
        .module('ShopaholicApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService){
        $scope.user = $rootScope.user;
        //alert($scope.user);
        if (!$scope.user){
            $location.url('/home');
        }
        if ($rootScope.user != undefined){
            $scope.readonly  =  true;
        }
        // Declaration of event handler
        $scope.update = update;

        // Implementation of event handler
        function update(user){
            UserService.updateUser(
                user._id, user,
                function(user){
                    console.log(user);
                }
            )
        }
    }
})();
