module.exports = function (app, reviewModel) {


    app.get("/api/project/product/review/:productId", findAllReviewsForProduct);
    app.get("/api/project/review/:userId", findAllReviewsForUser);
    app.post("/api/project/user/:userId/product/:productId", createReview);
    app.get("/api/project/review", selectedReview);
    app.put("/api/project/review", updateReview);
    app.get("/api/project/user/:userId/product/:productId", getIndexByUserUdAndProductId);
    app.delete("/api/project/review/:reviewId/product/", deleteReview);

    //$http.delete("/api/project/review/" +reviewId+ "/product/" +productId, reviewObj);

    function findAllReviewsForProduct(req, res) {
        var productId = req.params.productId;
        console.log("in service server find all reviews ", productId);
        reviewModel
            .findAllReviewsForProduct(productId)
            .then(function (products) {
                console.log("ALL REVIEWS FOR PRODUCTS ",products);
                res.json(products);
            });
    }

    function findAllReviewsForUser(req, res) {
        var userId = req.params.userId;
        //console.log("HERE -  reviews for user ", userId);
        reviewModel
            .findAllReviewsByUserId(userId)
            .then(function (reviews) {
                //console.log("Reviews from db ", reviews);
                res.json(reviews);
            });
    }

    function createReview(req, res) {
        var userId = req.params.userId;
        var productId = req.params.productId;
        var review = req.body;
        //console.log(userId);
        //console.log(productId);
        //console.log("Review at service server is ", review);
        reviewModel
            .addReview(userId, productId, review)
            .then(function(createdReview){
                res.json(createdReview);
            });
    }

    function selectedReview(req, res) {
        var reviewSelected = req.body;
        res.json(reviewSelected);
    }

    function updateReview(req, res) {
        var reviewForUpdate = req.body;
        console.log("REVIEW UPDATEEEE ", reviewForUpdate);
        reviewModel.updateReview(reviewForUpdate)
            .then(
                function (doc) {
                    console.log("This is ",doc);
                    //req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getIndexByUserUdAndProductId(req, res) {
        var userId = req.params.userId;
        var productId = req.params.productId;
        var indexReturned = reviewModel.getIndexByUserUdAndProductId(userId, productId)
            .then(
                function (doc) {
                    //console.log("This is ",doc);
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function deleteReview(req, res) {
        var reviewId = req.params.reviewId;
        //console.log("IN DELETE SERVICE ",reviewId);
        reviewModel.deleteReview(reviewId)
            .then(
                function (doc) {
                    //console.log("This is ",doc);
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

}

