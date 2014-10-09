app.controller('SignUpCtrl', function($scope, auth, $location, notifier){
    $scope.signup = function(user){
        auth.signup(user).then(function(success){
                notifier.success('User created successful');
                $location.path('/');
        })
    }
});