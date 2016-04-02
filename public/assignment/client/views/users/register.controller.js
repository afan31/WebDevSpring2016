'use strict';

(function () {
    angular
        .module('FormBuilderApp')
        .controller('RegisterController', registerController);


    function registerController(UserService, $location) {
        var vm = this;

        vm.register = register;

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
                        alert("Username is already present");
                    }
                    UserService
                    .register(user)
                        .then(function(response) {
                            var currentUser = response.data;
                            if (currentUser != null) {
                                UserService.setCurrentUser(currentUser);
                                $location.url("/profile");
                            }
                        });
                });
        }
    }
})();
