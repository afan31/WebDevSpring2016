'use strict';

(function () {
    angular
        .module('ShopaholicApp')
        .controller('HeaderController', headerController);

    function headerController($location, UserService){

        var vm  = this;

        //vm.isAdmin = false;
        vm.logout = logout;

        function init(){
            vm.$location = $location;
            UserService
                .getCurrentUser()
                .then(function (response) {
                   //if(response.data.role =="admin"){
                   //    vm.isAdmin = true;
                   //    console.log("IS ADMINNNNNN " ,vm.isAdmin );
                   //}
                });
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