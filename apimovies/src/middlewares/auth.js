const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authconfig = require("../../config/auth");

module.exports = (req,res,next) =>{
   //console.log(req.headers);

   if(!req.headers.authorization){
    res.status(401).json({msg: "usuario no autorizado"});
   }else{
       let token = req.headers.authorization.split(" ")[1];
       jwt.verify(token,authconfig.secret,(err,decoded)=>{
           if (err){
            res.status(500).json({msg: "ha ocurrido un error, ",err}); 
           }else{
             //console.log(decoded);
             req.user = decoded;
             next();
           }
       })
 
   }
 
};