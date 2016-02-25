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
                    //controller: 'HeaderController'
                })
                .when('/login', {
                    templateUrl: 'views/users/login.view.html',
                    //controller: 'HeaderController'
                })
                .when('/', {
                    templateUrl: 'views/home/home.view.html',
                    //controller: 'HeaderController'
                })
                .when('/home', {
                    templateUrl: 'views/users/admin.view.html',
                    //controller: 'HeaderController'
                })

                // For Sidebar links

                .when('/', {
                    templateUrl: 'views/home/home.view.html',
                    //controller: 'SidebarController'
                })
                .when('/forms', {
                    templateUrl: 'views/forms/forms.view.html',
                    //controller: 'SidebarController'
                })
                .when('/profile', {
                    templateUrl: 'views/users/profile.view.html',
                    //controller: 'SidebarController'
                })
                .when('/admin', {
                    templateUrl: 'views/admin/admin.view.html',
                    //controller: 'SidebarController'
                });
        }
})();


