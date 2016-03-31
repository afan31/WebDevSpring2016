'use strict';

(function () {
    angular
        .module('ShopaholicApp')
        .controller('HeaderController', headerController);

    function headerController($location, UserService){

        var vm  = this;

        vm.logout = logout;

        function init(){
            vm.$location = $location;
        }
        init();

        function logout(){
            console.log("In Logout");
            UserService
                .logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }
    }
})();