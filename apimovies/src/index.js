const express = require('express');
const app = express();
const {connection} = require('./database/db');
const router = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');



//Settings
app.set('port', process.env.port || 3000);

//enables cors
app.use(cors ( ));

// Middlewares
 app.use(bodyParser.urlencoded({extended:false}));
 app.use(bodyParser.json());


// Routes
app.use(router);
/*app.get('/', function(req, res){
 res.send("Bienvenidos a mi list de peliculas");
});*/



//starting the server
  app.listen(app.get('port'), () => {
  console.log('Test', app.get('port'));
  
  connection.sync({ force:false}).then(() =>{
      console.log("se ha establecido la conexion a la BD");
  })
});
