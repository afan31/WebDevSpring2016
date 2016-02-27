'use strict';

(function () {
    angular
        .module('FormBuilderApp')
        .controller('RegisterController', RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService){
        // Declaration of event handler
        $scope.register = register;

        // Implementation of event handler
        function register(userObject){
            UserService.createUser(userObject,
            function(user){
                $rootScope.user = user;
                $location.url('/profile');
            })
        }
    }
})();
