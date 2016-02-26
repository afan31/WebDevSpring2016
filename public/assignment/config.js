'use strict';

(function () {
    angular
        .module('FormBuilderApp')
        .config(configuration);

    function configuration($routeProvider){
            $routeProvider

                // For Header links
                .when('/register', {
                    templateUrl: 'views/users/register.view.html',
                    //controller: 'RegisterController'
                })
                .when('/login', {
                    templateUrl: 'views/users/login.view.html',
                    //controller: 'LoginController'
                })
                .when('/home', {
                    templateUrl: 'views/users/home.view.html',
                    //controller: 'HeaderController'
                })

                .when('/forms', {
                    templateUrl: 'views/forms/forms.view.html',
                    //controller: 'FormsController'
                })
                .when('/profile', {
                    templateUrl: 'views/users/profile.view.html',
                    //controller: 'ProfileController'
                })
                .when('/admin', {
                    templateUrl: 'views/admin/admin.view.html',
                    //controller: 'SidebarController'
                })
                .otherwise( {
                    redirectTo : "/home"
                });

        }
})();


