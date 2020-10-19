var app = angular.module("app",['ngCookies','ngRoute']);


app.controller("registerController", function($scope,$http,$location,$cookies,$window){

  $scope.username="";
  $scope.email="";
  $scope.password="";
  $scope.password_confirm="";
  $scope.data = null;
  $scope.response = null;
  $scope.status = null;

  /* for login*/
   $scope.message = null;
   $scope.alert_error = false;

  $scope.register = function(){
     alert($scope.username+" "+$scope.email);
     //console.log($scope.username);
        $http({
          method: 'POST',
          url: 'http://localhost:3000/users/register',
          data:{username:$scope.username,
                email:$scope.email,
                password: $scope.password
               }
         //headers:{'Content-Type': 'application/x-www-form-urlencoded'},
       }).then(function(response) {
         $scope.status = response.status,
         $scope.data = response.data,
         console.log($scope.data);
       });

     }

     $scope.login = function(){

       $http({
         method: 'POST',
         url: 'http://localhost:3000/users/login',
         data:{
               email:$scope.email,
               password: $scope.password
              }
        //headers:{'Content-Type': 'application/x-www-form-urlencoded'},
      }).then(function(response) {
        $window.sessionStorage.setItem("token",response.data.token);
        $window.sessionStorage.setItem("user",response.data.user.username);
        $scope.email="";
        $scope.password="";
          $window.location.href = '/tester/webmovies/index.html';
      }, function(response){
          //console.log(response);
          $scope.message = response.data.msg;
          $scope.alert_error = true;
        })
        }


});
