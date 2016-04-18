'use strict';

(function () {
    angular
        .module('ShopaholicApp')
        .controller('ProfileController', profileController);

    function profileController(UserService, $rootScope, ReviewService, ProductService) {
        var vm = this;
        vm.update = update;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                        console.log(response.data);
                        vm.currentUser = response.data;
                        vm.imageApi = "/api/upload/"+vm.currentUser._id;
                        UserService
                            .findUserByUsername(vm.currentUser.username)
                            .then(function (response) {
                                console.log("IN USER SERVICE ", response.data);
                                vm.currentUser = response.data;
                                if(vm.currentUser){
                                    UserService
                                        .setCurrentUser(vm.currentUser);
                                    console.log("The current user from the root scope is ",$rootScope.currentUser);
                                }
                                UserService
                                    .findLikesForUser(vm.currentUser._id)
                                    .then(function(response) {
                                        vm.likesData = response.data;
                                            console.log("Likes result is ",response.data);
                                        ReviewService.findAllReviewsForUser(vm.currentUser._id)
                                            .then(function(response){
                                                vm.reviewsData = response.data;
                                                console.log("Reviews data is ", response.data);
                                                vm.reviewsData.forEach(function (element, index, arr) {
                                                    console.log(vm.reviewsData[index].productId);
                                                    ProductService.findProdById(vm.reviewsData[index].productId)
                                                        .then(function (res) {
                                                                if (res.data) {
                                                                    console.log("Res.data ", res.data.name);
                                                                    vm.reviewsData[index].image=res.data.imageUrl;
                                                                    vm.reviewsData[index].productname=res.data.name;
                                                                    console.log("REVIEWS FULL DATA IS ", vm.reviewsData);
                                                                    UserService.findFollowersList(vm.currentUser._id)
                                                                        .then(function(response) {
                                                                            vm.followersData = response.data;
                                                                            console.log("Followers result --------->>>> ", response.data);
                                                                            UserService.findFollowingList(vm.currentUser._id)
                                                                                .then(function (response) {
                                                                                    vm.followingData = response.data;
                                                                                    console.log("Followers result --------->>>> ", response.data);
                                                                                })
                                                                        })

                                                                }
                                                            },
                                                            function (error) {
                                                                console.log(error.statusText);
                                                            });
                                                })
                                            })
                                },
                                    function (error) {
                                        console.log(error.statusText);
                                    });
                            });

                    },
                    function (error) {
                        console.log(error.statusText);
                    });
        }
        init();

        function update(user) {
            console.log("USER IS ",user);
            if (!user) {
                return;
            }
            UserService
                .updateUser(user, user._id)
                .then(function (response) {
                        console.log("USERNAME IS ", user.username);
                        alert("Your profile has been updated");

                        vm.update = response.data;
                        if (vm.update){
                            UserService
                                .findUserByUsername(user.username)
                                .then(function (response) {
                                    console.log("IN USER SERVICE ", response.data);
                                    vm.currentUser = response.data;
                                    if(vm.currentUser){
                                        UserService
                                            .setCurrentUser(vm.currentUser);
                                        console.log("The current user from the root scope is ",$rootScope.currentUser);
                                    }
                                });
                        }
                        console.log("In profile"+vm.update);
                    },
                    function (error) {
                        console.log(error);
                    });
        }

    }
})();

