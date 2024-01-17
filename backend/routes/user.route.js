const express = require("express");

import { checkDuplicateEmail } from "../middleware/VerifySignUp";
import { signup } from "../models/user.model";
import { signin } from "../models/user.model";
import { isAdmin } from "../middleware/auth.config";
import { getOneUser } from "../models/user.model";
import { getAllUsers } from "../models/user.model";
import { createUser } from "../models/user.model";

const userRouter = express.Router();

router.post("/signin", signin);
router.post("/signup", checkDuplicateEmail, signup);
router.get("/admin", isAdmin, getAllUsers);
router.get("/admin", isAdmin, getOneUser);
router.post("/admin", isAdmin, createUser);

module.exports = userRouter;
