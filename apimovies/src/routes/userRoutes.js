const express = require("express");
const UserRoutes = express.Router();
const UsersController = require("../controllers/usersController");


// Routes
UserRoutes.get("/", UsersController.all);
UserRoutes.post("/login",UsersController.signIn);
UserRoutes.post("/register",UsersController.signUp);
UserRoutes.get("/validate",UsersController.validate);

module.exports = UserRoutes;
