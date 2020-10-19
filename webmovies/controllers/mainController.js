
// var app = angular.module("app",['ngCookies','ngRoute']);
  app.controller('mainController', mainController);
  app.directive( 'elemReady', function( $parse )
      {
          return {
              restrict: 'A',
              link: function( $scope, elem, attrs ) {
                  elem.ready(function(){
                      $scope.$apply(function(){
                          let func = $parse(attrs.elemReady);
                          func($scope);
                      })
                  })
              }
          }
      });

  function mainController($scope, $http, $window, $cookies, webService, $location, $templateCache)
          {

          //  $templateCache.removeAll();
            webService.validateTokentest();
            // $scope.nombre = "webService";
            $scope.webService = webService;
            $scope.logname = $window.sessionStorage.getItem("user");


            $location.path('/home');

            $scope.goLogin = function(){
              $location.path('/login')
            }

            $scope.goRegister = function(){
              $location.path('/register')
            }

          $scope.logout = function(){
            webService.logout();

            }

      }
