
//var main = angular.module("main",['ngCookies']);
var app = angular.module("app",['ngCookies','ngRoute','ngtimeago']);
//var app = angular.module("app",['ngCookies']);


app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}]);

app.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

app.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix("");
});

  app.config(function($routeProvider) {

      $routeProvider
      .when("/login", {
          templateUrl : 'login.html',
          controller : "registerController"
      })
      .when("/", {
          templateUrl : 'index.html'
          // controller : "indexController"
      })
      .when("/home", {
          templateUrl : 'prueba.html'
          // controller : "indexController"
      })
      .when("/register", {
          templateUrl : 'register.html',
           controller : "registerController"

      }).when("/prueba", {
          templateUrl : 'pruebafff.html'
          // controller : "registerController"
      });
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
            config.headers['Authorization'] = $cookies.get('token');

            return config;
        },

        response: function(response)
        {
            //console.log(response);
            // respone has Authorization HTTP header, and token will be saved into the sessionStorage
            /*
            var tokenWithBearer = response.headers('Authorization');
            if (tokenWithBearer !== null) {
                var parts = tokenWithBearer.split(' ');
                var token = parts[1];
                $window.sessionStorage.token = token;
            }
            return response;
            */
            return response;
        },

        responseError: function(rejection)
        {
            if (rejection.status === 500)
                $window.location.href = '/500';

            return $q.reject(rejection);
        }
    };
});
