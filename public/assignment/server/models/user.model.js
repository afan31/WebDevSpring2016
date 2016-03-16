var mock = require("./user.mock.json");
module.exports= function() {
    var api = {
        createUser: createUser,
        findAll:findAll,
        findUserById: findUserById,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findUsersByUsername: findUsersByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;



    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        console.log("In Create user " + user.username);

        for(var u in mock){
            console.log(mock[u].username);
            if (mock[u].username === user.username) {
                return null;
            }
        }
        mock.push(user);
        return mock;
    }

    function findAll(){
        return mock;
    }

    function findUserById(userId) {
        for(var u in mock){
            if (mock[u].userId === userId) {
                return mock[u];
            }
        }
        return null;
    }

    function updateUser(user,userId) {
        console.log("In user model", user);
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

    function findUserByCredentials(credentials) {
        for(var u in mock){
            if (mock[u].username === credentials.username &&
                mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return null;
    }



}