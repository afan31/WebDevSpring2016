'use strict';

(function () {
    angular
        .module('FormBuilderApp')
        .controller('LoginController', loginController);

    function loginController(UserService, $location){
        var vm = this;

        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            console.log("username ",user.username );
            console.log("password ",user.password );
            if (!user) {
                return;
            }
            UserService
                .login({
                    username: user.username,
                    password: user.password
                })
                .then(function(response){
                    console.log("Here",response.data);
                    if(response.data) {
                        console.log("Here",response.data);
                        UserService.
                            setCurrentUser(response.data);
                            $location.url("/profile");
                    }
                });
        }
    }
})();
