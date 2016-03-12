"use strict";

(function () {
    angular
        .module("ShopaholicApp")
        .factory("UserService" , UserService);

    function UserService($rootScope) {
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
            updateUser: updateUser,
            findUserFirstNameByUserId: findUserFirstNameByUserId
        };
        return service;

        function setCurrUser(user){
            $rootScope.user = user;
        }

        function findUserByCredentials(username, password, callback) {
            var i = "";
            for (i in users) {
                if (users[i].username == username && users[i].password == password) {
                    callback(users[i]);
                    return;
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
            users.push(user);
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

        function findUserFirstNameByUserId(userId, callback) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id === userId) {
                    callback(users[i].firstName);
                }
            }
        }
    }
})();


