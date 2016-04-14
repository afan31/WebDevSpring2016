module.exports = function(mongoose) {

    //use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: [String],
        roles: [String],
        //phones:[String],
        likes:[String]
        // collection property sets
        // collection name to 'user'
    }, {collection: 'Shopaholic.user'});
    return UserSchema;
};