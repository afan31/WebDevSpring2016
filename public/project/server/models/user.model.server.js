//var mock = require("./user.mock.json");

// load q promise library
var q = require("q");
var bcrypt = require("bcrypt-nodejs");
// pass db and mongoose reference to model
module.exports= function(db, mongoose) {

    //load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    //create user model from schema
    var UserModel = mongoose.model('Shopaholic.user', UserSchema);


    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        findUsersByIds: findUserByIds,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        addLike: addLike,
        isLiked: isLiked,
        unLike: unLike,
        followers: followers,
        following: following,
        isFollowed: isFollowed,
        removeFromFollowers: removeFromFollowers,
        removeFromFollowing: removeFromFollowing,
        findAllFollowers: findAllFollowers,
        findAllFollowing: findAllFollowing,
        findAllUsers: findAllUsers,
        deleteUserById : deleteUserById

    };
    return api;

    function findAllFollowers(followersList){
        return UserModel.find({'_id':{$in:followersList}});
    }

    function findAllFollowing(followingList){
        console.log("IN FOLLOWING MODEL ", followingList);
        return UserModel.find({'_id':{$in:followingList}});
    }

    function followers(userId, currentUserId){
        return UserModel.update(
            {'_id': userId},
            {
                $addToSet :{'followers':currentUserId}
            }
        );
    }

    function following(userId, currentUserId){
        return UserModel.update(
            {'_id': currentUserId},
            {
                $addToSet :{'following':userId}
            }
        );
    }

    function isFollowed(userId, currentUserId){
        return UserModel.findOne({_id: userId, followers: {$in: [currentUserId]}});
    }

    function removeFromFollowers(userId, currentUserId){
        return UserModel.update(
            {'_id':userId},
            {
                $pullAll: {followers: [currentUserId]}
            }
        );
    }

    function removeFromFollowing(userId, currentUserId){
        return UserModel.update(
            {'_id':currentUserId},
            {
                $pullAll: {following: [userId]}
            }
        );
    }


    function createUser(user) {

        // use q to defer the response
        var deferred = q.defer();
        //console.log("User created is ", user);

        // insert new user with mongoose user model's create
        UserModel.create(user, function (err, doc) {
            //console.log(doc);

            if(err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        // return a promise
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();

        UserModel.findById(userId, function(err, doc)
        {
            if(err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByIds(userIds) {
        var deferred = q.defer();

        UserModel.find({
            _id: {$in: userIds}
        }, function(err, users) {
            if(err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        //console.log("Credentials  ", credentials);
        var deferred = q.defer();

        UserModel.findOne(

            {
                username: credentials.username,
                password: credentials.password
            },

            function(err, doc) {
                if(err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    //console.log("doc is ",doc);
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function updateUser(user,userId) {
        var deferred = q.defer();
        console.log("User id in model");
        console.log(userId)
        console.log("IN MODELLLLL LLLL ",user);
        //delete user._id;
        user.email = user.email.toString().split(',');
        console.log(user.email);
        //user.phones = user.phones.toString().split(',');
        //console.log(user.phones);
        console.log("updating....");
        //user.password = bcrypt.hashSync(user.password);
        return UserModel
            .update (
                {_id: userId},
                {$set: user}
            );
        //return deferred.promise;
    }

    function findUserByUsername (username) {
        var deferred = q.defer ();
        UserModel
            .findOne (
                {username: username},
                function (err, user) {
                    console.log("USERRRRR IS ",user);
                    if (!err) {
                        deferred.resolve(user);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function addLike(userId, productId){
        return UserModel.update(
            {'_id': userId},
            {
                $addToSet :{'likes':productId}
            }
        );
    }

    function isLiked(userId, productId){
        //console.log("Here isLiked", UserModel.findOne({_id: userId, likes: {$in: [productId]}}));
        return UserModel.findOne({_id: userId, likes: {$in: [productId]}});
    }

    function unLike(userId, productId){
        return UserModel.update(
            {'_id':userId},
            {
                $pullAll: {likes: [productId]}
            }
        );
    }

    function findAllUsers(){
        var deferred = q.defer();

        UserModel.find({

        }, function(err, users) {
            if(err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function deleteUserById(index){
        var usersAfterDeletion = UserModel.remove ({ _id: index})
        return usersAfterDeletion;
    }

}