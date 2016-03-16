'use strict';

(function () {
    angular
        .module('FormBuilderApp')
        .controller('ProfileController', profileController);

    function profileController(UserService, $rootScope) {
        var vm = this;
        vm.update = update;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    console.log(response.data);
                    vm.currentUser = response.data;
                },
                    function (error) {
                        console.log(error.statusText);
                    });
        }
        init();

        function update(user) {
            console.log(user._id);
            //console.log("User Id " +$rootScope.currentUser._id);
            //var userId = $rootScope.currentUser._id;
            if (!user) {
                return;
            }
            UserService
                .updateUser(user, user._id)
                .then(function (response) {
                    vm.update = response.data;
                    if (vm.update){
                       UserService
                           .findUserByUsername(user.username)
                           .then(function (response) {
                               vm.currentUser = response.data;
                               if(vm.currentUser){
                                   UserService
                                       .setCurrentUser(vm.currentUser);
                                   console.log("The current user from the root scope is ",$rootScope.currentUser);
                               }
                           })
                    }
                    console.log("In profile"+vm.update);
                });
        }
    }
})();
