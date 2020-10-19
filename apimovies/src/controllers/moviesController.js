const { Movie } = require("../database/db");
const { Favorite } = require("../database/db");
const { User } = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authconfig = require("../../config/auth");
const axios = require('axios');


async function isFavoritefun(movies_searh,idUsuario){

    return new Promise(resolve =>{
        var i =0;
        var num_item = movies_searh.length
            movies_searh.forEach( async (item) => {
              //console.log(item);
            Favorite.findOne({where:{userId:idUsuario,imdrId:item.imdbID}}).then(fav =>{
                if (fav){
                  // console.log(i);
                    item["favorite"] = true;
                    i=i+1;
                }
                else{
                   
                    //console.log(i);
                    item["favorite"] = false;
                    i=i+1;
                }

                if (i == num_item){
                    resolve(movies_searh);              
                }
               
            });
          
            
           
        });
    
     });
}



module.exports = {

  
   
    async search(req,res){
      try{      
        let tittle = req.query.tittle;
        let year = req.query.year;
        let route = "";
        if((tittle=="" && year=="")){
            res.status(404).json({msg: "you must write a title or year of the movie you want to search"});
        }else if ((tittle!="" && year=="")){
            route = "http://www.omdbapi.com/?s="+tittle+"&apikey=c67b7fb5";
        }else{
            route ="http://www.omdbapi.com/?s="+tittle+"&y="+year+"&apikey=c67b7fb5";
        }
            
        const result = await axios.get(route);
        var movies_searh = result.data.Search;
            if(movies_searh){ 
                    let movies_list = await isFavoritefun(movies_searh,req.user.user.id);
                    //console.log(movies_list);
                    res.json({ Movies: movies_list});
                
            }else{
                res.status(404).json({msg: "the search has not generated a result"});
            }
        }catch(err){
            console.log(err);
            res.status(500).json({msg: "An error has occurred: "+err});
    
         }
    

},

    async save(req,res){
        var movieId = "";
        var movieimdrId = "";
        console.log(req.body);
       await Movie.findOne({where: {imdrId:req.body.imdrid}}).then(result =>{
        
              if (!result){
                
                Movie.create({
                    tittle: req.body.tittle,
                    year: req.body.year,
                    imdrId: req.body.imdrid,
                    type: req.body.type,
                    poster: req.body.poster
                  }).then( Movie =>{
                      
                       movieId =  Movie.dataValues.id;
                       movieimdrId = Movie.dataValues.imdrId;

                       Favorite.create({          
                            userId: req.user.user.id,
                            movieId: movieId,
                            imdrId: movieimdrId
                        }).then( Favorite =>{
                            res.json({
                                movie: Movie,
                                favorite: Favorite
                            });
                        }).catch(err =>{
                            res.status(500).json(err);
                        });
                  }).catch(err =>{
                      res.status(500).json(err);
                  });
              }else{
                 Favorite.findOne({where: {userId:req.user.user.id, movieId:result.dataValues.id }}).then(result =>{
                    if(!result){                     
                        movieId = result.dataValues.id;
                        movieimdrId = result.dataValues.imdrId;
                        Favorite.create({         
                                UserId: req.user.user.id,
                                movieId: movieId,
                                imdrId: movieimdrId
                            }).then( Favorite =>{
                                res.json({
                                    movie: result,
                                    favorite: Favorite
                                });
                            }).catch(err =>{
                                res.status(500).json(err);
                            });
                    }else{
                        res.status(404).json({msg: "this movie is already on your favorites list"});
                    }
                }).catch(err =>{
                    res.status(500).json(err);
                    });
                 
              }
       }).catch(err =>{
        res.status(500).json(err);
        });   
            
    },

    async getfavorites(req,res){
       
        await Favorite.findAll({
            include:{
                model: Movie
            },
            where: {userId:req.user.user.id}}).then(result =>{
        
            if (result){
                //console.log(result);
                 res.json({
                     Favorite: result,
                     
                         });
            }
            }).catch(err =>{
                res.status(500).json(err);
            });
               
    },

    async delete(req,res){
        console.log(req.query);
        await Favorite.destroy({where: {userId:req.user.user.id,imdrId:req.query.imdrid}}).then(result =>{
            res.json({msg: "the movie has been removed from your favorites list"});
        }).catch(err =>{
            res.status(500).json(err);
            });
    }

}