app.controller('MoviesListCtrl', function($scope, cachedMovies){
    $scope.movies = cachedMovies.query();
});