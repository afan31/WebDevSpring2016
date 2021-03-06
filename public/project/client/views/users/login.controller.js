'use strict';

(function () {
    angular
        .module('ShopaholicApp')
        .controller('LoginController', loginController);

    function loginController(UserService, $location){
        var vm = this;


        vm.login = login;

        function init() {
            vm.notUser = false;
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
                .then(
                    function(response){
                    if(response.data) {
                        UserService.
                        setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                    }, function (error){
                        vm.notUser= true;
                    }
                );
        }
    }
})();
