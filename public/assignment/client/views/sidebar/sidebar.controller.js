'use strict';

(function () {
    angular
        .module('FormBuilderApp')
        .controller('SidebarController', sidebarController);

    function sidebarController($location, UserService){

        var vm  = this;

        function init(){
            //vm.$location = $location;
        }
        init();

        //function logout(){
        //    console.log("In Logout");
        //    UserService
        //        .logout()
        //        .then(function(){
        //            UserService.setCurrentUser(null);
        //            $location.url("/home");
        //        });
        //}
    }


})();
