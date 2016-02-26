'use strict';

(function () {
    angular
        .module('FormBuilderApp')
        .controller('LoginController', LoginController);

    function LoginController($scope, $location, $rootScope, UserService){
        // Declaration of event handler
        $scope.login = login;

        // Implementation of event handler
        function login(user){
            UserService.findUserByCredentials(
                user.username, user.password,
                function(user){
                    $rootScope.user = user;
                    $location.url('/profile');
                }
            )
        }
    }
})();
