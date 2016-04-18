"use strict";

(function () {
    angular
        .module("ShopaholicApp")
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
            addLike: addLike,
            isLiked: isLiked,
            unLike: unLike,
            followUser: followUser,
            isfollowed: isfollowed,
            undoFollowUser: undoFollowUser,
            getFollowersDetails: getFollowersDetails,
            getFollowingDetails: getFollowingDetails,
            findLikesForUser: findLikesForUser,
            findUserById : findUserById,
            findFollowersList: findFollowersList,
            findFollowingList: findFollowingList,
            findAllUsers : findAllUsers,
            deleteUserById : deleteUserById
            };
        return api;

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }

        function login(credentials) {
            console.log("In login,username " +credentials.username);
            console.log("In login,password " +credentials.password);
            return $http.post("/api/project/login", credentials);
        }

        function getProfile() {
            console.log("here");
            console.log("In Profile "+ $rootScope.currentUser._id);
            return $http.get("/api/project/profile/"+$rootScope.currentUser._id);
        }

        function register(user){
            console.log("In create User functionality");
            return $http.post("/api/project/register",user);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }

        function updateUser(user,userId){
            console.log("Here in client service ",user);
            return $http.put("/api/project/user/"+userId, user);
        }

        function findUserByUsername(username)    {
            return $http.get("/api/project/user?username=" +username);
        }
        function addLike(productId, userId){
            return $http.put("/api/project/user/"+userId+"/product/"+productId+"/like");
        }

        function isLiked(productId, userId){
            console.log("Client ",productId);
            console.log("Client ", userId);
            return $http.get("/api/project/user/"+userId+"/product/"+productId+"/isLiked");
        }

        function unLike(productId, userId){
            return $http.delete("/api/project/user/"+userId+"/product/"+productId+"/unLike");
        }

        function followUser(userId, currentUserId){
            return $http.put("/api/project/user/"+currentUserId+"/follows/"+userId);
        }

        function isfollowed(userId, currentUserId){
            return $http.get("/api/project/user/"+userId+"/followedBy/"+currentUserId);
        }

        function undoFollowUser(userId, currentUserId){
            console.log("user to be followed ", userId);
            console.log("user following ", currentUserId);
            return $http.delete("/api/project/user/"+currentUserId+"/unfollows/"+userId);
        }

        function getFollowersDetails(userId){
            return $http.get("/api/project/user/getFollowersDetails/"+userId);
        }

        function getFollowingDetails(userId){
            return $http.get("/api/project/user/getFollowingDetails/"+userId);
        }

        function findLikesForUser(userId){
            return $http.get("/api/project/user/getLikeDetails/"+userId);
        }

        function findFollowersList(userId){
            return $http.get("/api/project/user/getFollowersDetails/"+userId);
        }

        function findFollowingList(userId){
            return $http.get("/api/project/user/getFollowingDetails/"+userId);
        }

        function findUserById(userid){
            return $http.get("/api/project/user/" + userid);
        }

        function findAllUsers(){
            return $http.get("/api/project/admin/users/");
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/" + userId);
        }



    }
})();