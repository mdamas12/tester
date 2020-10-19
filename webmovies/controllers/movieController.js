// var app = angular.module("app",['ngCookies','ngRoute']);


app.controller("movieController", function($scope,$http,$location,$cookies,$window){

  $scope.tittle="";
  $scope.message = "";
  $scope.alert_error = false;
  $scope.addtrue = false;
  $scope.Movies=[];
  $scope.Favorites=[];
  $scope.listFavorites = [];


/*Get Favorite list*/
    $http({
      method: 'GET',
      url: 'http://localhost:3000/movies/mylist',
     //headers:{'Content-Type': 'application/x-www-form-urlencoded'},
   }).then(function(response) {
     $scope.Favorites = response.data.Favorite;
     $scope.Favorites.forEach(element => $scope.listFavorites.push(element.movie));

   },function(response){

         $scope.message = response.data;
         $scope.alert_error = true;
       });

  $scope.search = function(){

    //var token_ref = $window.sessionStorage.getItem("token")

        $http({
          method: 'GET',
          url: 'http://localhost:3000/movies/search?tittle='+$scope.tittle+'&year=',
         //headers:{'Content-Type': 'application/x-www-form-urlencoded'},
       }).then(function(response) {
         $scope.Movies = response.data.Movies;
         // console.log(response.data.Movies);
       },function(response){
            // console.log(response);
             $scope.message = response.data;
             $scope.alert_error = true;
           });
      }

      $scope.getfavorites = function(){

        //var token_ref = $window.sessionStorage.getItem("token")

            $http({
              method: 'GET',
              url: 'http://localhost:3000/movies/mylist',
             //headers:{'Content-Type': 'application/x-www-form-urlencoded'},
           }).then(function(response) {
             //$scope.fa = response.data.Movies;
             console.log(response.data);
           },function(response){
                // console.log(response);
                 $scope.message = response.data;
                 $scope.alert_error = true;
               });
          }

        $scope.addfavorite = function(){

          //var token_ref = $window.sessionStorage.getItem("token")
          $scope.imdbID = this.movie.imdbID;
          $scope.Tittle = this.movie.Title;
          $scope.Year = this.movie.Year;
          $scope.Type = this.movie.Type;
          $scope.Poster = this.movie.Poster;
          this.movie.favorite = true;

              $http({
                method: 'POST',
                url: 'http://localhost:3000/movies/favorite',
                data:{
                      tittle: $scope.Tittle,
                      imdrid: $scope.imdbID ,
                      year: $scope.Year,
                      type: $scope.Type,
                      poster: $scope.Poster
                     }
             }).then(function(response) {
               //console.log(response.data.movie);
               $scope.listFavorites.push(response.data.movie);
             },function(response){
                   //console.log(response);
                   $scope.message = response.data;
                   $scope.alert_error = true;
                 });

          }


          $scope.deletefavorite_list = function(){

            //var token_ref = $window.sessionStorage.getItem("token")
            $scope.imdbID = this.listFav.imdrId;
                $http({
                  method: 'delete',
                  url: 'http://localhost:3000/movies/favorite',
                  params:{
                    imdrid: $scope.imdbID
                        }
               }).then(function(response) {
                 for(i=0;i<$scope.listFavorites.length;i++){
                        console.log(i);
                      if($scope.listFavorites[i].imdrId == $scope.imdbID){
                          $scope.listFavorites.splice( i, 1);
                      }
                  }
               },function(response){
                     console.log(response);
                     $scope.message = response.data;
                     $scope.alert_error = true;
                   });

            }

            $scope.deletefavorite_movies = function(){

              this.movie.favorite = false;
              $scope.imdbID = this.movie.imdbID;
                  $http({
                    method: 'delete',
                    url: 'http://localhost:3000/movies/favorite',
                    params:{
                      imdrid: $scope.imdbID
                          }
                 }).then(function(response) {
                   for(i=0;i<$scope.listFavorites.length;i++){
                          console.log(i);
                        if($scope.listFavorites[i].imdrId == $scope.imdbID){
                            $scope.listFavorites.splice( i, 1);
                        }
                    }
                 },function(response){
                       console.log(response);
                       $scope.message = response.data;
                       $scope.alert_error = true;
                     });

              }



});
