app.controller('LoginCtrl', function($scope, $http, notifier, identity, auth, $location){
    $scope.identity = identity;
    $scope.login = function(user){
        auth.login(user).then(function(success){
            if(success){
                notifier.success('Successful login!');
                $location.path('/');
            }
            else {
                notifier.error('Username/Password is not valid!');
                $location.path('/');
            }
        })
    }

    $scope.logout = function(){
        auth.logout().then(function(){
            notifier.success('Successful logout!');
            if($scope.user){
                $scope.user.username = '';
                $scope.user.password = '';
            }
            $location.path('/');
        })
    }
});