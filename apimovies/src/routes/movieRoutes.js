const express = require("express");
const MovieRoutes = express.Router();
const MoviesController = require("../controllers/moviesController");
const auth = require("../middlewares/auth");

// Routes
MovieRoutes.get("/search", auth, MoviesController.search);
MovieRoutes.get("/mylist", auth, MoviesController.getfavorites);
MovieRoutes.post("/favorite", auth, MoviesController.save);
MovieRoutes.delete("/favorite",auth, MoviesController.delete);




module.exports = MovieRoutes;