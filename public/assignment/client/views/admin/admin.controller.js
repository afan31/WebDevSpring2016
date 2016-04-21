'use strict';

(function () {
    angular
        .module('FormBuilderApp')
        .controller('AdminController', adminController);

    function adminController(UserService){

        var vm  = this;

        vm.findAllUsers = findAllUsers;
        vm.register = register;
        vm.update = update;
        vm.selectUser = selectUser;
        vm.deleteUser = deleteUser;
        vm.predicate = 'username';
        vm.predicate1 = 'firstName';
        vm.predicate2 = 'lastName';
        vm.reverse = true;

        function init(){

            findAllUsers();


        }
        init();

        vm.order = function (predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;

        };
        vm.order1 = function (predicate1) {
            vm.reverse = (vm.predicate1 === predicate1) ? !vm.reverse : false;
            vm.predicate1 = predicate1;

        };
        vm.order2 = function (predicate2) {
            vm.reverse = (vm.predicate2 === predicate2) ? !vm.reverse : false;
            vm.predicate2 = predicate2;

        };

        function findAllUsers() {
            //console.log("here");
            UserService
                .findAllUsers()
                .then(function (response) {
                    if(response.status == 200){
                        vm.userData= response.data;
                        //console.log("USERSSSSSSSSSSSSSSS ", vm.userData);
                    }
                }, function (error) {
                    console.log("Error in getting all users", error.statusText);
                })

        }

        function register(user) {
            if (!user || !user.username || !user.password){
                alert("Username or password is missing");
                return;
            }
            for ( var i = 0; i < vm.userData.length; i++){
                if (vm.userData[i].username == user.username){
                    alert("username already exists");
                    vm.user = {};
                    return;
                }
            }
            console.log(user);
            UserService
                .findUserByUsername(user.username)
                .then(function(response){
                    console.log(response);
                    if(response.data){
                        alert("Username is already present");
                    }
                    UserService
                        .registerAdmin(user)
                        .then(function(response) {
                            console.log(response.data);
                            findAllUsers();
                            vm.user= null;

                        });
                });
        }

        function update(user) {
            if (!user) {
                return;
            }
            //for ( var i = 0; i < vm.userData.length; i++){
            //    if (vm.userData[i].username == user.username){
            //        alert("username already exists");
            //        return;
            //    }
            //}
            UserService
                .updateUser(user, user._id)
                .then(function (response) {
                        vm.userData = response.data;
                        findAllUsers();
                        vm.user= null;
                    },
                    function (error) {
                        console.log(error);
                    });
        }

        function selectUser(username) {
            UserService
                .findUserByUsername(username)
                .then(function (response) {
                    var userReturned = response.data;
            var selectedUser = {
                "_id" : userReturned._id,
                "username" :userReturned.username,
                "password" : userReturned.password,
                "firstName" : userReturned.firstName,
                "lastName" : userReturned.lastName,
                "email" : userReturned.email,
                "roles" : userReturned.roles,
            };
            vm.user = selectedUser;
        });
        }

        function deleteUser(userId) {
            UserService
                .deleteUserById(userId)
                .then(function(response){
                        if(response.data) {
                            vm.user =  null;
                            findAllUsers();
                        }
                    },
                    function (error) {
                        console.log(error.statusText);
                    });
        }

    }
})();