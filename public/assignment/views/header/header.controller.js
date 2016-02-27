'use strict';

(function () {
    angular
        .module('FormBuilderApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($scope, $location, UserService){
        $scope.logout = logout;
        function logout(){
            UserService.setCurrUser(null);
            $location.url('/home');
        }
    }

})();
