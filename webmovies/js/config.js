
//var main = angular.module("main",['ngCookies']);
var app = angular.module("app",['ngCookies','ngRoute','ngtimeago']);
//var app = angular.module("app",['ngCookies']);


app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}]);

app.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});



app.config(function($routeProvider, $locationProvider) {

      $routeProvider
      .when("/login", {
          templateUrl : '/login.html',
          controller : "registerController"
      })
      .when("/", {
          templateUrl : '/index.html',
           controller : "mainController"
      })
      .when("/home", {
          templateUrl : 'home.html',
           controller : "movieController"
      })
      .when("/index", {
         templateUrl : '/index.html',
         controller : "mainController"
      })
      .when("/register", {
          templateUrl : '/register.html',
           controller : "registerController"

      });

        $locationProvider.html5Mode(true);
  });


app.factory('authInterceptor', function($rootScope, $q, $window, $cookies)
{
    return {
        request: function(config)
        {

            config.headers = config.headers || {};
            config.headers['Accept-Language'] =  $cookies.get('_lang');
            //config.headers['X-API-KEY'] =  AKey;

            //var regex = /setmethod/i;

            //if(!regex.test(config.url))
            var token_ref = $window.sessionStorage.getItem("token");
            config.headers['Authorization'] = "Bearer"+" "+token_ref;

            return config;
        },

        // response: function(response)
        // {
        //    console.log(response.headers);
        //     // respone has Authorization HTTP header, and token will be saved into the sessionStorage
        //
        //     var tokenWithBearer = response.headers['Authorization'];
        //     // var tokenWithBearer = response.data.token;
        //       $window.sessionStorage.setItem("token",tokenWithBearer);
        //
        //     return response;
        //
        // },

    };
});
