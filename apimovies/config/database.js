require('dotenv').config();

module.exports ={
  username: process.env.DB_USERNAME ||  "root",
  password: process.env.DB_PASSWORD ||  "Nomadas-12",
  database: process.env.DB_DATABASE ||  "tester",
  host:  process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "mysql"
  
}

