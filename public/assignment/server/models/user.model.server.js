//var mock = require("./user.mock.json");

// load q promise library
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
        findUsersByIds: findUserByIds

        //findAll:findAll,
        //deleteUser: deleteUser,
        //updateUser: updateUser,
        //findUserByUsername: findUserByUsername,
        //findUsersByUsername: findUsersByUsername,

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

    //function findAll(){
    //    return mock;
    //}



    //function updateUser(user,userId) {
    //    console.log("In user model", user);
    //    var i = "";
    //    for (i in mock) {
    //        if (mock[i]._id == userId) {
    //            mock[i] = user;
    //        }
    //    }
    //    return mock;
    //}
    //
    //function deleteUser(userId){
    //    var i = "";
    //    for (i in mock) {
    //        if (mock[i]._id == userId) {
    //            mock.splice(i, 1);
    //        }
    //    }
    //    return mock;
    //
    //}
    //
    //function findUsersByUsername(usernames) {
    //    var users= [];
    //    for (var u in usernames) {
    //        var user = findUserByUsername(usernames[u]);
    //        if (user) {
    //            users.push ({
    //                username: user.username,
    //                _id: user._id
    //            });
    //        }
    //    }
    //    return users;
    //}
    //
    //function findUserByUsername(username){
    //    for(var u in mock) {
    //        if (mock[u].username === username){
    //            return mock[u];
    //        }
    //    }
    //    return null;
    //}

}