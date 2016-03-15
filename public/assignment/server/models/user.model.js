var mock = require("./user.mock.json");
module.exports= function() {
    var api = {
        createUser: createUser,
        findAll:findAll,
        findById: findById,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findUsersByUsername: findUsersByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;



    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return mock;
    }

    function findAll(){
        return mock;
    }

    function findById(userId) {
        for(var u in mock){
            if (mock[u].userId === userId) {
                return mock[u];
            }
        }
        return null;
    }

    function updateUser(user,userId) {
        var i = "";
        for (i in mock) {
            if (mock[i]._id == userId) {
                mock[i] = user;
            }
        }
        return mock;
    }

    function deleteUser(userId){
        var i = "";
        for (i in mock) {
            if (mock[i]._id == userId) {
                mock.splice(i, 1);
            }
        }
        return mock;

    }

    function findUsersByUsername(usernames) {
        var users= [];
        for (var u in usernames) {
            var user = findUserByUsername(usernames[u]);
            if (user) {
                users.push ({
                    username: user.username,
                    _id: user._id
                });
            }
        }
        return users;
    }

    function findUserByUsername(username){
        for(var u in mock) {
            if (mock[u].username === username){
                return mock[u];
            }
        }
        return null;
    }

    function findUserByCredentials(username,password) {
        for(var u in mock){
            if (mock[u].username === username &&
                mock[u].password === password) {
                return mock[u];
            }
        }
        return null;
    }

}