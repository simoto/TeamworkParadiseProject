app.controller('MovieDetailsCtrl', function($scope, $routeParams, cachedMovies){
   // $scope.movie = CourseResource.get({id: $routeParams.id });

    $scope.movies = cachedMovies.query().$promise.then(function(collection){
        collection.forEach(function(movie){
            if(movie._id === $routeParams.id){
                $scope.movie = movie;
            }
        })
    })
});