app.factory('cachedMovies', function(MovieResource){
    var cachedMovies;

    return {
        query: function(){
            if(!cachedMovies){
                var cachedMovies = MovieResource.query();
                return cachedMovies;
            }
            else {
                return cachedMovies;
            }
        }
    }
});