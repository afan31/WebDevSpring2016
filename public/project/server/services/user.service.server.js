
module.exports = function(app, userModel, productModel,securityService) {

    var bcrypt = require("bcrypt-nodejs");

    var multer  = require('multer');
    var upload = multer({ dest: __dirname+'/../../../../public/uploads' });

    var passport  = securityService.getPassport();


    app.post("/api/project/register", register);
    app.get("/api/project/profile/:userId", profile);
    app.post("/api/project/login", passport.authenticate('project'), login);

    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);
    app.put("/api/project/user/:userId", updateUser);
    app.get("/api/project/user?[username=username]", findUserByUsername);
    app.get("/api/project/user/:userid", findUserById);

    app.put("/api/project/user/:userId/product/:productId/like", addLike)

    app.get("/api/project/user/:userId/product/:productId/isLiked", isLiked);
    app.delete("/api/project/user/:userId/product/:productId/unLike", unLike);
    app.get("/api/project/user/getLikeDetails/:userId", getLikesforUser);

    app.get("/api/project/user/getFollowersDetails/:userId", getFollowersListForUser);
    app.get("/api/project/user/getFollowingDetails/:userId", getFollowingListForUser);

    app.put("/api/project/user/:currentUserId/follows/:userId", followUser);
    app.get("/api/project/user/:userId/followedBy/:currentUserId",isFollowed);
    app.delete("/api/project/user/:currentUserId/unfollows/:userId", unFollowUser);


    app.post ("/api/upload/:userId", upload.single('myFile'), uploadImage);



    function uploadImage(req, res) {

        var userId      = req.params.userId;
        console.log()
        var user  = req.body;
        console.log("USER SERVICE ", user);

        var myFile        = req.file;
        if (myFile != null) {
            var destination   = myFile.destination;
            var path          = myFile.path;
            var originalname  = myFile.originalname;
            var size          = myFile.size;
            var mimetype      = myFile.mimetype;
            var filename      = myFile.filename;
            user.imageUrl = "/uploads/"+filename;
        }



        userModel
            .updateUser(user, userId)
            .then(function (response) {
                    //console.log(response);
                    //res.send(200);
                    return userModel.findUserById(userId);
                },
                function (error) {
                    res.status (400).send ("Error in updating user by Id", error.statusText);
                })
            .then(function (response) {
                    if(response != null) {
                        req.session.currentUser = response;
                        res.redirect(req.header('Referer') + "#/profile");
                        //res.json(response);
                    }
                    else{
                        console.log("User not found by Id after updating the user, returning null");
                        res.json(null);
                    }
                },
                function (error) {
                    res.status (400).send ("Error in findUserById function after updating the user", error.statusText);
                });
    }

    //Follow
    function followUser(req, res){
        var currentUserId = req.params.currentUserId;
        var userId = req.params.userId;
        console.log("Current user id ", currentUserId);
        console.log("User id to be followed ",userId);
        userModel
            .followers(userId, currentUserId)//Add currently loggedin user into userid(whose profile currently loggedin
            //visits) followers list
            .then(function (response) {
                //res.json(200);
                return userModel.following(userId, currentUserId);//Add userid of that user whom currently loggedin user
                //is following into currently loggedin user following list
            }, function (error) {
                res.status (400).send ("Error in adding currently loggedin user into userid's follower list", error.statusText);
            })
            .then(function (response) {
                res.json(200);
            }, function (error) {
                res.status (400).send ("Error in adding currently loggedin user into userid's follower list", error.statusText);
            })



    }

    function isFollowed(req, res){
        var currentUserId = req.params.currentUserId;
        var userId = req.params.userId;
        userModel
            .isFollowed(userId, currentUserId)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.status (400).send ("Error in checking if followers list has currently " +
                    "loggedin user's userId", error.statusText);
            })
    }

    function unFollowUser(req, res){
        var currentUserId = req.params.currentUserId;
        var userId = req.params.userId;
        userModel
            .removeFromFollowers(userId, currentUserId)//Remove currently loggedin user from userid(whose profile currently loggedin
            //visits) followers list
            .then(function (response) {
                console.log("Remove from followers ",response);
                return userModel.removeFromFollowing(userId, currentUserId);//Remove userid of that user whom currently loggedin user

            }, function (error) {
                res.status (400).send ("Error in removing currently loggedin user from " +
                    "userid's follower list", error.statusText);
            })
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.status (400).send ("Error in removing userId from currently " +
                    "logged in user's following list", error.statusText);
            })
    }

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

    //function login(req, res) {
    //    var credentials = req.body;
    //    var user = userModel.findUserByCredentials(credentials)
    //        .then(
    //            function(doc) {
    //                //console.log("This is ",doc);
    //                req.session.currentUser = doc;
    //                res.json(doc);
    //            },
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}

    function login(req, res) {
        var user = req.user;
        console.log("login ", user);
        res.json(user);
    }


    function loggedin(req, res) {
        console.log("Here in loggedin");
        res.send(req.isAuthenticated() && req.user.type === 'project'? req.user: null);
    }


    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        console.log("Update user" , user);
        userModel.updateUser(user,userId)
            .then(
                function(doc) {
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
                    console.log("USER returned is ", user);
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


    function getFollowersListForUser(req, res){
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(function (response) {
                if(response != null){
                    console.log("Likes is ",response.followers);
                    return userModel.findAllFollowers(response.followers);
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

    function getFollowingListForUser(req, res){
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(function (response) {
                if(response != null){
                    console.log("Following is ",response.following);
                    return userModel.findAllFollowing(response.following);
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