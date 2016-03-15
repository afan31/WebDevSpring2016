"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService" , userService);

    function userService($http, $rootScope) {

        var api = {
            setCurrentUser : setCurrentUser,
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

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" +username);
        }

        function findUserByCredentials(username, password){
            return $http.get("/api/assignment/user/user?username="+username+"&password="+password);
        }

        function findAllUsers(){
            $http.get("/api/assignment/user");
        }

        function createUser(user){
            $http.get("/api/assignment/user",user);
        }

        function deleteUserById(userId){
            $http.delete("/api/assignment/user/"+userId);
        }

        function updateUser(user,userId){
            $http.put("/api/assignment/user/"+userId, user);
        }
    }
})();


