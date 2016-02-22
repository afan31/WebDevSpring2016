'use strict';

(function () {
    angular.module('FormBuilderApp', [])
        .config(function ($routeProvider){
            $routeProvider

                // For Header links
                .when('/register', {
                    templateUrl: '/views/users/register.view.html',
                    //controller: 'HeaderController'
                })
                .when('/login', {
                    templateUrl: '/views/users/login.view.html',
                    //controller: 'HeaderController'
                })
                .when('/profile', {
                    templateUrl: '/views/users/profile.view.html',
                    //controller: 'HeaderController'
                })
                .when('/admin', {
                    templateUrl: '/views/users/admin.view.html',
                    //controller: 'HeaderController'
                })

                // For Sidebar links

                .when('/home', {
                    templateUrl: '/views/home/home.view.html',
                    //controller: 'SidebarController'
                })
                .when('/forms', {
                    templateUrl: '/views/forms/login.view.html',
                    //controller: 'SidebarController'
                })
                .when('/profile', {
                    templateUrl: '/views/users/profile.view.html',
                    //controller: 'SidebarController'
                })
                .when('/admin', {
                    templateUrl: '/views/users/admin.view.html',
                    //controller: 'SidebarController'
                });
        });
})();


