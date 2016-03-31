module.exports = function(app, userModel) {

    app.post("/api/assignment/register", register);
    app.get("/api/assignment/profile/:userId", profile);
    app.post("/api/assignment/login", login);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);

    //app.get("/api/assignment/user/:id", findUserById);




    //app.put("/api/assignment/user/:userId", updateUser);
    //
    //
    //app.get("/api/assignment/user?[username=username]", findUserByUsername);
    //
    //app.get("/api/assignment/user", findAllUsers);
    //
    //app.get("/api/assignment/user/user?username=&password=", findUserByCredentials);
    //app.delete("/api/assignment/user", deleteUserById);


    function register(req, res) {
        var user = req.body;
        user = userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(user);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function profile(req, res){

        var user = userModel.findUserById(userId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function(doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function loggedin(req, res) {
        console.log("In logged in",req.session.currentUser);
        res.json(req.session.currentUser);
    }


    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }


    //
    //function findUserById(req,res) {
    //    var deferred = q.defer();
    //    UserModel.findById(userId, function (err, doc) {
    //        if (err) {
    //            deferred.reject(err);
    //        } else {
    //            deferred.resolve(doc);
    //        }
    //    }
    //    return null;
    //    });
    //return deferred.promise;
    //}







    //function updateUser(req,res){
    //    var user = req.body;
    //    var userId = req.params.userId;
    //    console.log("In server service " + userId );
    //    var usersArray = userModel.updateUser(user, userId);
    //    req.session.currentUser = user;
    //    res.json(usersArray);
    //}



    //function findUserByUsername(req, res){
    //    var user = req.body;
    //    var username = req.query.username;
    //    console.log(username);
    //    var userReturned = userModel.findUserByUsername(username);
    //    console.log("User Returned is ",userReturned);
    //    res.json(userReturned);
    //}
    //
    //function findAllUsers(req,res) {
    //    console.log(req);
    //    var users = req.body;
    //    res.json(users);
    //}
    //
    //
    //
    //
    //
    //function findUserByCredentials(req,res){
    //    var username = req.query.username;
    //    var password = req.query.password;
    //    var userReturned = userModel.findUserByCredentials(username,password);
    //    res.json(userReturned);
    //}
    //
    //
    //
    //function deleteUserById(req,res){
    //    var user = req.body;
    //    var usersArray = userModel.deleteUser(user.userId);
    //    res.json(usersArray);
    //}


}