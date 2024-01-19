const express = require("express");
const userController = require("../models/user.model.js");
const verifySignUp = require("../middleware/verifySignUp.js");
const auth = require("../middleware/auth.config.js");
const authController = require("../controllers/auth.controller.js");

const userRouter = express.Router();

userRouter.post("/signin/", userController.signin);
userRouter.post(
  "/signup/",
  verifySignUp.checkDuplicateEmail,
  userController.signup
);
userRouter.post("/admin/", auth.isAdmin, userController.createUser);

userRouter.get("/admin", auth.isAdmin, userController.getAllUsers, (res) => {
  res.status(200).json({ message: "Bienvenue" });
  authController.adminBoard;
});
userRouter.get(
  "/admin",
  auth.isAdmin,
  userController.getOneUser,
  (req, res) => {
    res.status(201).json({ message: "Bienvenue" });
    authController.adminBoard;
  }
);

module.exports = userRouter;
