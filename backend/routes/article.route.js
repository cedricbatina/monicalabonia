const express = require("express");
const articleCtrl = require("../controllers/article.controller");
const verifySignUp = require("../middleware/verifySignUp.js");
const auth = require("../middleware/auth.config.js");
const authController = require("../controllers/auth.controller.js");

const router = express.Router();
router.get("/articles", articleCtrl.fetchAllArticles);
router.get("/articles/:id", articleCtrl.fetchOneArticle);
router.post("/auth/admin/articles", auth.isAdmin, articleCtrl.createArticle);
router.put("/auth/admin/articles/:id", auth.isAdmin, articleCtrl.modifyArticle);
router.delete(
  "/auth/admin/articles/:id",
  auth.isAdmin,
  articleCtrl.suppressArticle
);

module.exports = router;
