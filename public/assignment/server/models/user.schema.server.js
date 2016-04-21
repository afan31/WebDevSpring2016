'use strict';

module.exports = function(mongoose) {

    //use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: [String],
        roles: {type:[String], default:"student"},
        phones:[String],
        type:{type:String, default:"assignment"}
    }, {collection: 'user'});
    return UserSchema;
};