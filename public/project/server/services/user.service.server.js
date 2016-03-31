module.exports = function(app, userModel) {

    app.post("/api/project/user", createUser);
    app.get("/api/project/profile/:userId", profile);
    app.post("/api/project/login", login);
    app.put("/api/project/user/:userId", updateUser);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);
    app.get("/api/project/user?[username=username]", findUserByUsername);

    app.get("/api/project/user", findAllUsers);
    app.get("/api/project/user/:id", findUserById);
    app.get("/api/project/user/user?username=&password=", findUserByCredentials);
    app.delete("/api/project/user", deleteUserById);


    function createUser(req, res) {
        var user = req.body;
        users = userModel.createUser(user);
        if (users === null){
            res.json(null);
        }else {
            req.session.currentUser = user;
            res.json(user);
        }

    }

    function profile(req, res){
        var userId =  req.params.userId;
        console.log("In profile method in server service" +userId);
        var user = userModel.findUserById(userId);
        res.json(user);
    }


    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
    }

    function loggedin(req, res) {
        console.log("In logged in",req.session.currentUser);
        res.json(req.session.currentUser);
    }

    function updateUser(req,res){
        var user = req.body;
        var userId = req.params.userId;
        console.log("In server service " + userId );
        var usersArray = userModel.updateUser(user, userId);
        req.session.currentUser = user;
        res.json(usersArray);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function findUserByUsername(req, res){
        var user = req.body;
        var username = req.query.username;
        console.log(username);
        var userReturned = userModel.findUserByUsername(username);
        console.log("User Returned is ",userReturned);
        res.json(userReturned);
    }

    function findAllUsers(req,res) {
        console.log(req);
        var users = req.body;
        res.json(users);
    }

    function findUserById(req,res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
    }



    function findUserByCredentials(req,res){
        var username = req.query.username;
        var password = req.query.password;
        var userReturned = userModel.findUserByCredentials(username,password);
        res.json(userReturned);
    }



    function deleteUserById(req,res){
        var user = req.body;
        var usersArray = userModel.deleteUser(user.userId);
        res.json(usersArray);
    }

}

