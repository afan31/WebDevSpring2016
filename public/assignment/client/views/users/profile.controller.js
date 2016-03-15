'use strict';

(function () {
    angular
        .module('FormBuilderApp')
        .controller('ProfileController', profileController);

    function profileController(UserService, $routeParams) {
        var vm = this;

        var username = $routeParams.username;
        console.log(username);

        function init() {
            UserService
                .getProfile()
                .then(function (response) {
                    vm.profile = response.data;
                    console.log(vm.profile);
                });
        }
        return init();
    }
})();
