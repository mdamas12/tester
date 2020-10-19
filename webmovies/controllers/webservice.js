angular.module('app').factory('webService', ['$http', '$window', '$cookies', '$q', webService]);

function webService($http, $window, $cookies, $q, $location)
{
    let user = null;
    let loaded = false;
    let menu = [];

    function validateTokentest()
    {

        let q = $q.defer();
        $http({
            method: 'GET',
            url: "http://localhost:3000/users/validate"
               // headers:{'Authorization':'Bearer'+' '+ $cookies.get('token')}
        }).then(function(response) {
             $window.sessionStorage.setItem("user",response.data.user.user.username);
             loaded = true;
             q.resolve(response);
        },function(response) {
            user = null;
            $window.location.href = '/tester/webmovies/login.html';
          //  http://localhost/tester/webmovies

        });

        return q.promise;
    }

    function logout()
    {
        $window.sessionStorage.removeItem("user");
        $window.sessionStorage.removeItem("token");
        $window.location.href = '/tester/webmovies/login.html';
    }

    function profile()
    {
        $window.location.href = '/profile';
    }

    function getUser()
    {
        return user;
    }

    function getLoaded()
    {
        return loaded;
    }

    function getMenuList()
    {
        return menu;
    }

    return {
        validateTokentest: validateTokentest,
        //getMenu: getMenu,
        logout: logout,
        profile: profile,
        user: getUser,
        loaded: getLoaded,
        menu: getMenuList
    }
}
