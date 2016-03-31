'use strict';

(function () {
    angular
        .module('ShopaholicApp')
        .controller('LoginController', loginController);

    function loginController(UserService, $location){
        var vm = this;

        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            if (!user) {
                return;
            }
            UserService
                .login({
                    username: user.username,
                    password: user.password
                })
                .then(function(response){
                    console.log("In LOGIN CONTROLLER "  , response.data);
                    if(response.data) {
                        UserService.
                        setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                });
        }
    }
})();





//'use strict';
//
//(function () {
//    angular
//        .module('ShopaholicApp')
//        .controller('LoginController', LoginController);
//
//
//    function LoginController($scope, $location, $rootScope, UserService){
//        // Declaration of event handler
//        $scope.login = login;
//
//        // Implementation of event handler
//        function login(user){
//            UserService.findUserByCredentials(
//                user.username, user.pwd,
//                function(user){
//                    $rootScope.user = user;
//                    //alert($rootScope.user);
//                    $location.url('/profile');
//                }
//            )
//        }
//    }
//})();
