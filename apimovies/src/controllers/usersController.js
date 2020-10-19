
const { User } = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authconfig = require("../../config/auth");

module.exports = {

    async all(req,res){
       let users = await User.findAll();
       console.log(users);
       res.json(users);
    },
     //Login User
     signIn(req,res){
        
         let {email,password} = req.body;

         User.findOne({
             where:{
                  email: email
             }
         }).then(User => {

            if(!User){
                res.status(404).json({msg: "no hay usuaro registrado con este Email"});

            }else{
                if (bcrypt.compareSync(password, User.password)){

                    let Token = jwt.sign({user: User}, authconfig.secret,{
                        expiresIn: authconfig.expires 
                    });

                        res.json({
                            user: User,
                            token: Token 
                         });

                }else{
                    res.status(401).json({msg: "password incorrecta"});
                }
            }

         }).catch(err =>{
            res.status(500).json(err);
        });
       
     },

     // Register User
     signUp(req,res){

       let password = bcrypt.hashSync(req.body.password, +authconfig.rounds);
       User.create({
            username: req.body.username,
            email: req.body.email,
            password: password
          }).then( User =>{
              let Token = jwt.sign({user: User}, authconfig.secret,{
                expiresIn: authconfig.expires    
              });

              res.json({
                 user: User,
                 token: Token 
              });
          }).catch(err =>{
              res.status(500).json(err);
          });
       
    },

        // Register User
     async validate(req,res){

        //console.log(req.headers);

        if(!req.headers.authorization){
            res.status(401).json({msg: "usuario no autorizado"});
           }else{
               let token = req.headers.authorization.split(" ")[1];
               jwt.verify(token,authconfig.secret,(err,decoded)=>{
                   if (err){
                    res.status(500).json({msg: "ha ocurrido un error, ",err}); 
                   }else{
                    res.json({
                        user: decoded,
                        token: token 
                     });
                   }
               })
         
           }
            
         }


}