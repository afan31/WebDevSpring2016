"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService" , UserService);

    function UserService() {
        var users = [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "roles": ["student"]
            },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": ["admin"]
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["faculty"]
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "roles": ["student"]
            }
        ];

        var service = {
            setCurrUser : setCurrUser,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;

        function setCurrUser(user){
            $rootScope.user = user;
        }

        function findUserByCredentials(username, password, callback) {
            var i = null;
            for (i in users) {
                if (users[i].username == username && users[i].password == password) {
                    callback(users[i]);
                }
                else
                    callback(null);
            }
        }

        function findAllUsers(callback){
            callback(users);
        }

        function createUser(user, callback) {
            user["_id"] = (new Date).getTime();
            users.add(user);
            callback(user);
        }

        function deleteUserById(userId, callback) {
            var i = "";
            for (i in users) {
                if (users[i]._id == userId) {
                    users.splice(i, 1);
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback) {
            var i = "";
            for (i in users) {
                if (users[i]._id == userId) {
                    users[i] = user;
                    callback(users[i]);
                }
            }
        }
    }
})();


