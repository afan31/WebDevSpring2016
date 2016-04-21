"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService" , userService);

    function userService($http, $rootScope) {

        var api = {
            setCurrentUser : setCurrentUser,
            getCurrentUser : getCurrentUser,
            getProfile : getProfile,
            login : login,
            logout : logout,
            register: register,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            registerAdmin: registerAdmin,

            findAllUsers : findAllUsers,
            deleteUserById: deleteUserById
            //findUserById: findUserById
            //findUserByUsername: findUserByUsername,
            //findUserByCredentials: findUserByCredentials,

            //updateUser: updateUser
        };
        return api;

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function login(credentials) {
            console.log("In login,username " +credentials.username);
            console.log("In login,password " +credentials.password);
            return $http.post("/api/assignment/login", credentials);
        }

        function getProfile() {
            console.log("here");
            console.log("In Profile "+ $rootScope.currentUser._id);
            return $http.get("/api/assignment/profile/"+$rootScope.currentUser._id);
        }

        function register(user){
            console.log("In create User functionality");
            return $http.post("/api/assignment/register",user);
        }

        function registerAdmin(user){
            console.log("In create User functionality");
            return $http.post("/api/assignment/register/admin",user);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function updateUser(user,userId){
            console.log("Here in client service ",user);
            return $http.put("/api/assignment/user/"+userId, user);
        }

        function findUserByUsername(username)    {
            return $http.get("/api/assignment/user?username=" +username);
        }

        //function findUserById(userId)    {
        //    return $http.get("/api/assignment/user?userId=" +userId);
        //}

        function findAllUsers(){
            return $http.get("/api/assignment/admin/users");
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }


    }
})();


