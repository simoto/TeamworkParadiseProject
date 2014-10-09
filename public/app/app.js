var app = angular.module('app', ['ngResource', 'ngRoute']).value('toastr', toastr);

app.config(function($routeProvider, $locationProvider){
  //  $locationProvider.html5Mode(true);
    var routeRoleChecks = {
            admin: {
                authenticate: function(auth) {
                    console.log('test');
                    return auth.isAuthorizedForRole('admin');
                }

            },
            authenticated: {
                authenticate: function(auth) {
                return auth.isAuthenticated();
                }
            }
    };

    $routeProvider
        .when('/', {
            templateUrl: 'partials/main/home',
            controller: 'MainCtrl'
        })
        .when('/movies', {
            templateUrl: 'partials/movies/movies-list',
            controller: 'MoviesListCtrl'
        })
        .when('/movies/:id', {
            templateUrl: 'partials/movies/movies-details',
            controller: 'MovieDetailsCtrl'
        })
        .when('/admin/users', {
            templateUrl:'/partials/admin/users-list',
            controller: 'UserListCtrl',
            resolve: routeRoleChecks.admin
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'ProfileCtrl',
            resolve: routeRoleChecks.authenticated
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'SignUpCtrl'
        })
    });

app.run(function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(ev, current, previous,rejection){
        if(rejection === 'not authorized'){
            $location.path('/');
       }
    })
})
