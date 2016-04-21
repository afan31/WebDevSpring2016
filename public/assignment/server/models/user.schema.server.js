module.exports = function(mongoose) {

    //use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: [String],
        role: {type:String, default:"user"},
        phones:[String],
        type:{type:String, default:"assignment"}
    }, {collection: 'user'});
    return UserSchema;
};