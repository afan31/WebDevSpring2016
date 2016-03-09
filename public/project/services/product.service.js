(function () {
    angular
        .module("ShopaholicApp")
        .factory("ProductService", ProductService);

    function ProductService($http) {

        var reviews = [
            {"userId" : 234,
                "title": "This is a test title 1",
                "review" : "This is a test review for macbook pro. Product ID: 1219696697139",
                "rating": 4,
                "productId" : "7639085"},

            {"userId" : 345,
                "title": "This is a test title 2",
                "review" : "This is a test review for macbook pro. Product ID: 1219696697139",
                "rating": 4,
                "productId" : "7619002"}
        ];

        var api = {
            findProductsByTitle: findProductsByTitle,
            browseProductsByCategory: browseProductsByCategory,
            findAllReviewsForProduct: findAllReviewsForProduct,
            createReview:createReview
        };
        return api;

        function findProductsByTitle(title, callback){
            var searchParam = title;
            $http.get("https://api.bestbuy.com/v1/products((search="+searchParam+"))?apiKey=ay4rd26c7bqjh9zutd5ynkm6&facet=customerReviewAverage&pageSize=20&format=json")
                .success(callback);
        }

        function browseProductsByCategory(category, callback){
            var categoryParam = category;
            $http.get("https://api.bestbuy.com/v1/products((categoryPath.id="+categoryParam+"))?apiKey=ay4rd26c7bqjh9zutd5ynkm6&facet=bestSellingRank&pageSize=20&format=json")
                .success(callback);
        }


        function findAllReviewsForProduct(productId){
            var reviewParam = productId;
            var toReturn = reviews.filter(function(review){
                return (review.productId === reviewParam);
            });
            return toReturn;
        }

        function createReview(userId, productId, review) {
            var currReview = {
                "userId": userId,
                "productId": productId,
                "title": review.title,
                "review": review.review,
                "rating": 2

            };
            reviews.push(currReview);
            review.title = null;
            review.rating = null;
            review.review = null;
            review.user = null;
            review.productId = null;
            console.log(reviews);

            return findAllReviewsForProduct(productId);
        }
    }
})();

