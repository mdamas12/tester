# README.MD
Esta es una breve descripción sobre el contenido y configuracion sobre la prueba para tester.

## Contenido
Este proyecto tiene dos ramas: apimovies y webmovies.
 ** apimovies ** contienes el desarrollo backend de la prueba, realizado en Express, mysql, ORM  Sequelize y JWT 
 ** webmovies ** contiene en desarrollo Frontend de la prueba realizado en Angularjs, Html, css, javascripts y bootstrap.

 ## Estructura de apimovies
 este proyecto esta desarrollado con estilo de arquitectura de software Modelo - Vista - Controlador aqui se describe el contenido de las carpetas:
 ** carpeta config: contiene los archivos de configuracion:
    **auth.js : contiene la configuracion para los datos del Token para usuarios.
    **database.js : contiene la configuracion de la base de datos.
** carpeta src: contiene la arquitectura del api (MVC).
   ** Carpeta controllers: 
     contienes los archivos de funcionabilidad y manejo de datos para esta aplicacion, cada modelo tiene un controllador:
      **userController.js : este archivo relaciona al modelo User las sus rutas y funciones:
       **funcion all : esta funcion devolvera todos los usuarios que se encuentren en mi base de datos.
       **Funcion signIn : esta funcion es el login de usuarios, esta funcion recibe email y contrasena del usuario, validando que se encuentren en la base datos, si se encuentra se genera un token y se envia.
       **funcion signUp: esta funcion guarda un usuario nuevo en la base de datos (verifica si el email ya existe), una vez guardado genera el token al usuario y lo envia.

       **moviesController.js : este archivo relaciona al modelo Movie con las rutas y funciones:
       **funcion search: esta funcion recibira un nombre, con este nombre se consumira el servicio de http://www.omdbapi.com/?; el resultado de esta consulta, se valida si alguna de las peliculas eencontradas ya es favorita consultando en favorites, si es favorita, se agrega un elemento al arreglo (favorite:true ) o (favorite:false) de no ser aun favorita y se enviara el arreglo resultante: Movies: movies_list.
       **Funcion save: esta funcion recibira los datos de la pelicula seleccionada a ser favorita, valida si aun no se encuentra como favorita para el usuario, sino es, lo guarda en favorites y guarda la informacion de la pelicula en movies.
       **funcion getfavorites : esta funcion genera un arreglo de todas las peliculas seleccionadas como favoritas del usuario que esta logueado.
       ** Funcion delete :  esta funcion recibe el id de la pelicula seleccionada y eliminara el registro de favorites segun el usuario logueado.

   **carpeta database. esta carpeta es creada por el orm sequelize, contiene a su vez dos carpetas:
      **migrations : son los archivos creados por sequelize al generar un modelo, para luego ser generados en la base de datos.
      **seeders : se utilizan para cargar datos de prueba, sin embargo, no fue aplicada para esta prueba.
      **db.js : conecta los modelos y sus asociaciones con la base de datos a traves de sequelize.
   **carpeta middelwares : contiene el archivo **auth.js el cual valida si un usuaro esta logueado o no.
   **carpeta models: esta carpeta contiene todos los medelos utilizados
      **User.js: contiene la configuracion de modelo usuario, asocioaciones con otros modelos y apuntes a las base de datos.
      **Movie.js : contiene la configuracion de modelo Movie, asocioaciones con otros modelos y apuntes a las base de datos.
      **favorite.js : contiene la configuracion de modelo Favorite, asocioaciones con otros modelos y apuntes a las base de datos.
   **carpeta routes: obtengo todas las rutas de la aplicacion separadas por archivos de rutas para cada modelo:
      **userRoutes.js :  contiene todas las rutas para el manejo de usuarios
      **moviesRoutes.js :  contiene todas las rutas para el manejo de movies
  