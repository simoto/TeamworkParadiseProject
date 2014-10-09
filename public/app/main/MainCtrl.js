'use strict';

app.controller('MainCtrl', function($scope, cachedMovies){
    $scope.movies = cachedMovies.query();
});