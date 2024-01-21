const express = require("express");
const userController = require("../models/user.model.js");
const verifySignUp = require("../middleware/verifySignUp.js");
const auth = require("../middleware/auth.config.js");
const authController = require("../controllers/auth.controller.js");

const userRouter = express.Router();

userRouter.post("/signin", userController.signin);
userRouter.post(
  "/signup",
  verifySignUp.checkDuplicateEmail,
  userController.signup
);
userRouter.post("/admin", auth.isAdmin, userController.createUser);
userRouter.get("/admin/:id", auth.isAdmin, userController.getOneUser);

userRouter.get("/admin", auth.isAdmin, userController.getAllUsers);

module.exports = userRouter;
