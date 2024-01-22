const express = require("express");
const userModel = require("../models/user.model.js");
const verifySignUp = require("../middleware/verifySignUp.js");
const auth = require("../middleware/auth.config.js");
const authController = require("../controllers/auth.controller.js");

const userRouter = express.Router();

userRouter.post("/signin", userModel.signin);
userRouter.post("/signup", verifySignUp.checkDuplicateEmail, userModel.signup);
userRouter.post("/auth/admin", auth.isAdmin, userModel.createUser);
userRouter.get("/auth/admin/:id", auth.isAdmin, userModel.getOneUser);

userRouter.get("/auth/admin/all", auth.isAdmin, userModel.getAllUsers);
userRouter.get("/auth/user/:id", auth.isUser, authController.userBoard);
userRouter.get("/all", (_req, res) => {
  // Votre logique pour répondre à la route "/all"
  res.status(200).json({ message: "Contenu public" });
});
userRouter.get("/auth/admin", auth.isAdmin, authController.adminBoard);

module.exports = userRouter;
