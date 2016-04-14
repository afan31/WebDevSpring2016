
module.exports = function(app, userModel, productModel) {

    app.post("/api/project/register", register);
    app.get("/api/project/profile/:userId", profile);
    app.post("/api/project/login", login);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);
    app.put("/api/project/user/:userId", updateUser);
    app.get("/api/project/user?[username=username]", findUserByUsername);
    app.get("/api/project/user/:userid", findUserById);

    app.put("/api/project/user/:userId/product/:productId/like", addLike)

    app.get("/api/project/user/:userId/product/:productId/isLiked", isLiked);
    app.delete("/api/project/user/:userId/product/:productId/unLike", unLike);
    app.get("/api/project/user/getLikeDetails/:userId", getLikesforUser);

    function findUserById(req, res){
        var userId = req.params.userid;
        userModel
            .findUserById(userId)
            .then(function (response) {
                    if(response != null) {
                        res.json(response);
                    }
                    else{
                        console.log("User not found by Id, returning null");
                        res.json(null);
                    }
                },
                function (error) {
                    res.status (400).send ("Error in findUserById function", error.statusText);
                });
    }



    function register(req, res) {
        var user = req.body;
        //console.log("User created is ", user);
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
                    //console.log("This is ",doc);
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function loggedin(req, res) {
       // console.log("In logged in",req.session.currentUser);
        res.json(req.session.currentUser);
    }


    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        //console.log("IN MODEL UPDATE ", user);
        userModel.updateUser(user,userId)
            .then(
                function(doc) {
                    //console.log(doc);
                    //req.session.currentUser = doc;
                    res.json(doc);

                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername (req, res) {
        //console.log("FIND USERNAME ", req.query.username);
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

    function addLike(req, res){
        var userId = req.params.userId;
        var productId = req.params.productId;
        //console.log(userId);
        //console.log(productId);
        userModel
            .addLike(userId, productId)
            .then(function (response) {
                res.json(200);

            }, function (error) {
                res.status (400).send ("Error in adding likes to User", error.statusText);
            })
    }

    function isLiked(req, res){
        var userId = req.params.userId;
        var productId = req.params.productId;
        console.log("in user service, isLiked ", userId);
        console.log("in user service, isLiked ", productId);

        userModel
            .isLiked(userId, productId)
            .then(function (response) {
                    res.json(response);
                },
                function (error) {
                    res.status (400).send ("Error in retrieving liked products by user", error.statusText);
                })
    }

    function unLike(req, res){
        var userId = req.params.userId;
        var productId = req.params.productId;
        userModel
            .unLike(userId, productId)
            .then(function (response) {
                    res.json(response);
                },
                function (error) {
                    res.status (400).send ("Error in retrieving liked rest by user", error.statusText);
                })
    }

    function getLikesforUser(req, res){
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(function (response) {
                if(response != null){
                    console.log("Likes is ",response.likes);
                    return productModel.findAllProduct(response.likes);
                }
            }, function (error) {
                res.status (400).send ("Error in findUserById function in getLikes function", error.statusText);
            })
            .then(function (response) {
                console.log(response);
                res.json(response);
            }, function (error) {
                res.status(400).send("Error in getting likes list for routeparams user", error.statusText);
            })
    }
}