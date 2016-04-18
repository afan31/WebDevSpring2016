module.exports = function(app, userModel, securityService) {

    var bcrypt = require("bcrypt-nodejs");

    var passport  = securityService.getPassport();

    app.post("/api/assignment/register", register);
    app.get("/api/assignment/profile/:userId", profile);
    app.post("/api/assignment/login", passport.authenticate('assignment'), login);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.put("/api/assignment/user/:userId", updateUser);
    app.get("/api/assignment/user?[username=username]", findUserByUsername);


    function register(req, res) {
        var user = req.body;

        //console.log("User created is ", user);
        user.password = bcrypt.hashSync(user.password);

        user = userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function (user) {
                    if(user){

                        req.login(user, function (err) {
                            console.log("User in user service register ", user);
                            if (err) {
                                console.log("ERROR");
                                res.status(400).send(err);
                            } else {
                                console.log("NO ERROR ",user);
                                res.json(user);
                            }
                        });
                    }
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
        var user = req.user;
        console.log("login ", user);
        res.json(user);
    }


    function loggedin(req, res) {
        console.log("Here in loggedin");
        res.send(req.isAuthenticated() && req.user.type === 'assignment'? req.user: null);
    }


    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        console.log("IN MODEL UPDATE ", user);
        userModel.updateUser(user,userId)
            .then(
                function(doc) {
                    console.log(doc);
                    //req.session.currentUser = doc;
                    res.json(doc);

                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername (req, res) {
        console.log("FIND USERNAME ", req.query.username);
        userModel
            .findUserByUsername (req.query.username)
            .then (
                function (user) {
                    //delete user.password;
                    res.json (user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

}