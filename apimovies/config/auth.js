require('dotenv').config();

module.exports ={

    secret: process.env.AUTH_SECRET ||  "secretpass",
    expires: process.env.AUTH_EXPIRES ||  "24h",
    rounds: process.env.AUTH_ROUND ||  10,
}