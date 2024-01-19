const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const connection = require("./config/connection.js");
//const artcilesRoute = require("./routes/artcile.route");
const userRouter = require("./routes/user.route.js");
const path = require("path"); // getting access to the server's path
const helmet = require("helmet"); // for security

app.use((res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  //next();
});
app.use(helmet());
app.use(bodyParser.json()); // bodyParser is used by all endpoints

app.use("/images", express.static(path.join(__dirname, "images")));
//app.use("/api/artciles", artcilesRoute);
app.use("/api/auth", userRouter);

module.exports = app;
