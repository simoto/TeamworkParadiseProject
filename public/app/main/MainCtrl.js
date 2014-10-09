'use strict';

app.controller('MainCtrl', function($scope){
    $scope.hello = 'Hi from angular!';
    $scope.movies = [
        {name: "X-man", year: 2000, rating: 5.0 },
        {name: "X-man 2", year: 2002, rating: 5.0 },
        {name: "Pathological", year: 2003, rating: 5.0 },
        {name: "The mist", year: 2004, rating: 5.0 },
        {name: "The thing", year: 2005, rating: 5.0 },
        {name: "Silent Hill", year: 2006, rating: 5.0 },
        {name: "X-man 3", year: 2007, rating: 5.0 },
        {name: "Dead Race", year: 2008, rating: 5.0 }
    ]
});