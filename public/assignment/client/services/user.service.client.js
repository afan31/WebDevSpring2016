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
            findAllUsers : findAllUsers,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
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

        function updateUser(user,userId){
            console.log("Here in client service "+userId);
            return $http.put("/api/assignment/user/"+userId, user);
        }


        function logout() {
            return $http.post("/api/assignment/logout");
        }


        function findUserByUsername(username)    {
            return $http.get("/api/assignment/user?username=" +username);
        }

        function findUserByCredentials(username, password){
            return $http.get("/api/assignment/user/user?username="+username+"&password="+password);
        }

        function findAllUsers(){
            return $http.get("/api/assignment/user");
        }

        function createUser(user){
            console.log("In create User functionality");
            return $http.post("/api/assignment/user",user);
        }

        function deleteUserById(userId){
            return $http.delete("/api/assignment/user/"+userId);
        }


    }
})();


