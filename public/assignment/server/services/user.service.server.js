module.exports = function(app, userModel) {
    //app.post("/api/assignment/user/login", login);
    //app.get("/api/assignment/user/loggedin", loggedin);
    //app.post("/api/assignment/user/logout", logout);
    //app.post("/api/assignment/user/register", register);


    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=", findUserByUsername);
    app.get("/api/assignment/user/user?username=&password=", findUserByCredentials);
    app.delete("/api/assignment/user", deleteUserById);
    app.put("/api/assignment/user", updateUser);

    function createUser(req, res) {
        var user = req.body;
        users = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(users);
    }

    function findAllUsers(req,res) {
        var users = req.body;
        res.json(users);
    }

    function findUserById(req,res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function findUserByUsername(req, res){
        var user = req.body;
        var userReturned = userModel.findUserByUsername(user.username);
        res.json(userReturned);
    }

    function findUserByCredentials(req,res){
        var username = req.query.username;
        var password = req.query.password;
        var userReturned = userModel.findUserByCredentials(username,password);
        res.json(userReturned);
    }

    function updateUser(req,res){
        var user = req.body;
        var usersArray = userModel.updateUser(user, user.userId);
        res.json(usersArray);
    }

    function deleteUserById(req,res){
        var user = req.body;
        var usersArray = userModel.deleteUser(user.userId);
        res.json(usersArray);
    }

}