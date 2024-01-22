const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const artcilesRoute = require("./routes/artcile.route");
const userRouter = require("./routes/user.route.js");
const articleRouter = require("./routes/article.route.js");
const path = require("path"); // Obtenir l'accès au chemin du serveur
const helmet = require("helmet"); // Pour la sécurité
const cors = require("cors");
// Middleware pour gérer les CORS (Cross-Origin Resource Sharing)
/*app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next(); // appel de  next pour passer à la suite du middleware
});*/

app.use(helmet());
app.use(bodyParser.json()); // bodyParser pour les points de terminaison
app.use(cors());
// Middleware pour servir les fichiers statiques depuis le dossier "images"
app.use("/images", express.static(path.join(__dirname, "images")));

// Utilisation des routes définies dans userRouter pour les endpoints "/api/auth"
app.use("/api", userRouter);
app.use("/api", articleRouter);

module.exports = app;
