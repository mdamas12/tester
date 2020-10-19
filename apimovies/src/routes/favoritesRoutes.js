const express = require("express");
const FavoritesRoutes = express.Router();
const FavoritesController = require("../controllers/favoritesController");
const auth = require("../middlewares/auth");

// Routes
//CategoriesRoutes.get('/',(req,res) => res.send('estoy dentro de categorias'));
FavoritesRoutes.post("/", auth, FavoritesController.save);
//UserRoutes.post("/login",UsersController.signIn);
//UserRoutes.post("/register",UsersController.signUp);
//categoriesRoutes.get("/:id", categoriesController.search);
//UserRoutes.post("/", UsersController.save);
//categoriesRoutes.put("/:id", categoriesController.update);
//categoriesRoutes.delete("/:id", categoriesController.delete);



module.exports = FavoritesRoutes;