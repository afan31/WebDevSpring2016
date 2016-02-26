'use strict';

(function () {
    angular
        .module('FormBuilderApp')
        .controller('HeaderController', HeaderController);

    function HeaderController(){
        $scope.logout = logout();
        function logout(){
            UserService.setCurrUser(null);
            $location.url('/home');
        }
    }

})();
