(function () {
    angular
        .module("ShopaholicApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($rootScope, $routeParams, $http, ProductService, UserService, ReviewService) {
        var vm = this;
        var skuId = $routeParams.skuId;
        vm.abc = false;
        vm.xyz = true;

        // Added for star rating -start
        vm.rating1 = 1;
        //vm.rating2 = 2;
        vm.isReadonly = true;
        vm.rateFunction = rateFunction;

        function rateFunction(rating) {
            console.log('Rating selected: ' + rating);
        }
        //added for star-rating -end

        vm.callUpdate = callUpdate;
        //renderReview(skuId);
        vm.addReview = addReview;
        vm.selectedReview = selectedReview;
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;
        vm.cancelReview = cancelReview;
        vm.findUserFirstNameByUserId = findUserFirstNameByUserId;
        vm.likeProd = likeProd;
        vm.isliked = isliked;
        vm.undolikeProd = undolikeProd;
        vm.findUserByReviewUserId = findUserByReviewUserId;
        vm.followUser = followUser;
        vm.undofollowUser = undofollowUser
        vm.isFollowed1 = isFollowed1;
        vm.avgProductRating = avgProductRating;
        vm.showReview = showReview;

        function isFollowed1(a,b) {
            return (b.indexOf(a) > -1);
        }
        function init() {

            $rootScope.$on('$routeChangeSuccess', function () {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            });

            UserService
                .getCurrentUser()
                .then(function (response) {
                    console.log("RESPONSE ", response.data);
                    if(!response.data){
                        vm.isliked = false;
                    }
                    if (response.data) {
                        vm.currentUser = response.data;

                        renderReview(skuId);
                        console.log("Current User ", vm.currentUser);
                        isliked();

                    }
                    else {
                        vm.readonly = true;
                    }
                }, function (error) {
                    console.log("Error in calling 'getCurrentUser'",error.statusText);
                });

            $http.get("http://api.bestbuy.com/v1/products/" + skuId + ".json?apiKey=ay4rd26c7bqjh9zutd5ynkm6")
                .success(renderProduct);

            function renderProduct(response) {
                vm.product = response;
                console.log("Product is ", vm.product);
            }


        }
        init();


        function callUpdate() {
            //alert("Here");
            $('.star-rating').raty({
                path: 'images/',
                score: function () {
                    // console.log("Score ", $(this).attr('data-score'));
                    return $(this).attr('data-score');
                }
            });
        }


        function renderReview(skuId) {
            console.log("sku ", skuId);
            ReviewService.
                findAllReviewsForProduct(skuId)
                .then(function (response) {
                        console.log("THis is find all reviews ",response.data);
                        vm.reviewsData = response.data;
                        console.log("THIS ",vm.reviewsData);
                        vm.findUserByReviewUserId(vm.reviewsData);
                        vm.avgProductRating(vm.reviewsData);
                    },
                    function (error) {
                        console.log(error.statusText);
                    });
            //console.log("Here "+ vm.reviewsData);
        }

        function addReview(reviewObject, rating) {
            //console.log("rating is ", rating);
            reviewObject.rating = rating;
            console.log("in add review controller ", reviewObject);
            console.log(vm.currentUser);
            vm.show = true;
            ReviewService.
                createReview(vm.currentUser._id, $routeParams.skuId, reviewObject)
                .then(function (response) {
                        console.log("RESPONSE DATA FOR ADD REVIEW IS" , response.data);
                        vm.reviewsData = response.data;
                        vm.abc = false;
                        renderReview(skuId);
                    },
                    function (error) {
                        console.log(error.statusText);
                    });
        }

        function findUserByReviewUserId(reviews) {
            console.log("Reviews here ",reviews);
            reviews.forEach(function (element, index, arr) {
                UserService.findUserById(reviews[index].userId)
                    .then(function (response) {
                            if (response.data) {
                                reviews[index].username=response.data.username;
                                console.log("USERNAME IS ",reviews[index].username);
                            }
                        },
                        function (error) {
                            console.log(error.statusText);
                        });
            })
        }

        function selectedReview(ratingIndex) {
            vm.abc = true;
            vm.xyz = false;
            console.log("Selected Reviews data ", vm.reviewsData[ratingIndex]);
            vm.selectedIndex = ratingIndex;
            //var editReview = ProductService.selectedReview(234,$routeParams.skuId,reviewObject);
            var editReview = {
                "_id": vm.reviewsData[ratingIndex]._id,
                "userId": vm.reviewsData[ratingIndex].userId,
                "title": vm.reviewsData[ratingIndex].title,
                "review": vm.reviewsData[ratingIndex].review,
                "rating": vm.reviewsData[ratingIndex].rating,
                "productId": vm.reviewsData[ratingIndex].productId
            }

            console.log(editReview);

            vm.review = editReview;
        }

        function updateReview(review, rating) {
            review.userId = vm.currentUser._id;
            review.rating = rating;
            console.log("THIS IS UPDATED REVIEW ", review);
            ReviewService
                .updateReview(review)
                .then(function (response) {
                    console.log("Here is the response ",response);
                    if (response) {
                        console.log("Updated Review is ",response);
                        vm.reviewsData[vm.selectedIndex] = response;
                        vm.selectedIndex = -1;
                        vm.review = {};
                        vm.abc = false;
                        renderReview(skuId);
                    }
                }, function (error) {
                    console.log("Error in adding like for a Product", error.statusText);
                })
        }

        function deleteReview(reviewObject) {
            console.log("HERE IN DELETE REVIEW CONTROLLER ", reviewObject);
            ReviewService
                .deleteReview(reviewObject._id)
                .then(function (response) {
                if (response.status == 200) {
                    console.log("Updated Review is ",response);
                    vm.reviewsData = response.data;
                    vm.review = null;
                    renderReview(skuId);
                }
            }, function (error) {
                console.log("Error in adding like for a Product", error.statusText);
            })
        }

        function cancelReview(reviewIndex) {
            vm.abc = false;
            vm.selectedIndex = reviewIndex;
            vm.selectedIndex = -1;
            vm.review = null;
        }

        function findUserFirstNameByUserId(userId)
        {
            var userFirstName;
            UserService.findUserFirstNameByUserId(userId, function(response){
                userFirstName = response;
            });

            return userFirstName;
        }


        function likeProd(productId){
            console.log("Here in likeProd");
            console.log("get current user ", vm.currentUser);
            UserService
                .addLike(skuId, vm.currentUser._id)
                .then(function (response) {
                    if(response.status == 200 || response.data.n == 1){
                        console.log("RESPONSE FOR LIKE ", response);
                        vm.isliked = true;
                        ProductService.addProd(vm.product);
                    }
                }, function (error) {
                    console.log("Error in adding like for a Product", error.statusText);
                })
        }

        function isliked(){
            console.log("Here in liked ");
            console.log("get current user here ", vm.currentUser);
            UserService
                .isLiked(skuId, vm.currentUser._id)
                .then(function (response) {
                    if(response.data){
                        vm.isliked = true;
                    }
                    else{
                        vm.isliked = false;
                    }
                }, function (error) {
                    console.log("Error in retrieving productId from likes Array of current User", error.statusText);
                })
        }

        function undolikeProd(prodId){
            UserService
                .unLike(prodId, vm.currentUser._id)
                .then(function (response) {
                    console.log(response);
                    if(response.status == 200 && (response.data.nModified == 1 || response.data.n == 1)){
                        vm.isliked = false;
                    }
                }, function (error) {
                    console.log("Error in removing like for a Product", error.statusText);
                })
        }

        //Code for Follow-following

        function followUser(userId){
            console.log("Current user id is ", userId);
            console.log("get current user ", vm.currentUser._id);
            UserService
                .followUser(userId, vm.currentUser._id)
                .then(function (response) {
                    if(response.status == 200){
                     //   vm.isfollowed = true;
                        vm.reviewsData=[];
                        init();
                      //  renderReview(skuId);
                    }
                }, function (error) {
                    console.log("Error in following a user", error.statusText);
                })
        }

        function undofollowUser(userId){
            console.log("Current user is ",userId)
            UserService
                .undoFollowUser(userId, vm.currentUser._id)
                .then(function (response) {
                    console.log(response);
                    if(response.status == 200 && (response.data.nModified == 1 || response.data.n == 1)){
                      //  vm.isfollowed = false;
                        vm.reviewsData=[];
                        init();
                       // renderReview(skuId);
                    }
                  //  vm.isfollowed = false;

                }, function (error) {
                    console.log("Error in removing like for a Product", error.statusText);
                })
        }

        function avgProductRating(reviewsData){
            console.log("REVIEWS DATA ", reviewsData);
            var avgRating = 0;
            for(var each in reviewsData){
                avgRating += parseInt(reviewsData[each].rating);
            }
            vm.avgRating = avgRating / reviewsData.length;
            console.log(vm.avgRating);
            if (isNaN(vm.avgRating)) {
                vm.avgRating = 0;
            }
        }

        function showReview() {
            vm.abc = true;
            vm.xyz = true;
            console.log("show review ",vm.abc);

        }

    }
})();

