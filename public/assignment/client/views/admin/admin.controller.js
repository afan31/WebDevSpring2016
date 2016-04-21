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

        function init(){

            findAllUsers();


        }
        init();

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

        function selectUser(selectedIndex) {
            var selectedUser = {
                "_id" : vm.userData[selectedIndex]._id,
                "username" : vm.userData[selectedIndex].username,
                "password" : vm.userData[selectedIndex].password,
                "firstName" : vm.userData[selectedIndex].firstName,
                "lastName" : vm.userData[selectedIndex].lastName,
                "email" : vm.userData[selectedIndex].email,
                "role" : vm.userData[selectedIndex].role,
            };
            vm.user = selectedUser;
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