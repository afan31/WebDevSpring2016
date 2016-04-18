var bcrypt = require("bcrypt-nodejs");
var q = require("q");

// pass db and mongoose reference to model
module.exports= function(db, mongoose) {

    //load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    //create user model from schema
    var UserModel = mongoose.model('User', UserSchema);


    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        findUsersByIds: findUserByIds,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername
    };
    return api;



    function createUser(user) {

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create
        UserModel.create(user, function (err, doc) {
            console.log(doc);

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
                    deferred.resolve(doc);
                }
             });
            return deferred.promise;
    }

    function updateUser(user,userId) {
        var deferred = q.defer();
        delete user._id;
        user.email = user.email.toString().split(',');
        user.phones = user.phones.toString().split(',');
        user.password = bcrypt.hashSync(user.password);
        console.log("UPDATED USER WILL BE ", user);
        //UserModel
        //    .update (
        //        {userId: user._id},
        //        {$set: user},
        //        function (err, user) {
        //            //console.log("fsdvsdffdfsg",user);
        //
        //            if (!err) {
        //                deferred.resolve(user);
        //            } else {
        //                deferred.reject(err);
        //            }
        //        }
        //    );
        //return deferred.promise;
        return UserModel
            .update (
                {_id: userId},
                {$set: user}
            );
    }

    //function updateUser(user,userId) {
    //    var deferred = q.defer();
    //    console.log("User id in model");
    //    console.log(userId)
    //    console.log("IN MODELLLLL LLLL ",user);
    //    //delete user._id;
    //    user.email = user.email.toString().split(',');
    //    console.log(user.email);
    //    //user.phones = user.phones.toString().split(',');
    //    //console.log(user.phones);
    //    console.log("updating....");
    //    user.password = bcrypt.hashSync(user.password);
    //    return UserModel
    //        .update (
    //            {_id: userId},
    //            {$set: user}
    //        );
    //    //return deferred.promise;
    //}

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

}