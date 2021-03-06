'use strict';

(function () {
    angular
        .module('ShopaholicApp')
        .controller('RegisterController', registerController);


    function registerController(UserService, $location) {
        var vm = this;

        vm.register = register;
        vm.isUsernamePresent = false;

        function init() {
            //UserService
            //    .getCurrentUser()
            //    .then(function (response) {
            //            console.log(response.data);
            //            vm.currentUser = response.data;
                //        },
                //        function (error) {
                //            console.log(error.statusText);
                //        });
        }
        init();

        function register(user) {
            console.log(user);
            UserService
                .findUserByUsername(user.username)
                .then(function(response){
                    if(response.data){
                        vm.isUsernamePresent = true;
                    }else {
                        UserService
                            .register(user)
                            .then(function (response) {
                                console.log("RESPONSE ", response);
                                var currentUser = response.data;
                                //console.log("Current User ",currentUser);
                                if (currentUser != null) {
                                    UserService.setCurrentUser(currentUser);
                                    $location.url("/profile");
                                }
                            });
                    }
                });
        }
    }
})();