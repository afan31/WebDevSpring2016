(function(){
    $(init);

    var $movieTitleTxt;
    var $searchBtn;
    var $searchResults;

    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE";

    function init() {
        $movieTitleTxt = $('#movieTitleTxt');
        $searchBtn = $('#searchBtn');
        $searchResults = $('#searchResults tbody')
        $searchBtn.click(searchMovie);
    }

    function searchMovie() {
        var title = $movieTitleTxt.val();
        var url = SEARCH_URL.replace("TITLE", title);
        //console.log(url);
        $.ajax ({
            url: url,
            success: renderSearchResults
        });
    }

    function renderSearchResults(response) {
        console.log(response);
        //alert(response);
        var totalResults = response.totalResults;
        alert(totalResults);
        var movies = response.Search;

        for(var m = 0; m < movies.length; m++){
            var movie = movies[m];
            var posterUrl = movie.Poster;
            var title = movie.Title;
            var year = movie.Year;
            var imdbID = movie.imdbID;


            alert(movie);

            var $tr = $("<tr>");

            alert($tr);
            var $td=$("<td>")
                .append(posterUrl)
                .appendTo($tr);



            $td=$("<td>")
                .append(title)
                .appendTo($tr);

            $td=$("<td>")
                .append(year)
                .appendTo($tr);

            $td=$("<td>")
                .append(imdbID)
                .appendTo($tr);

            alert($searchResults);

            $searchResults.append($tr);

        }

    }
})();