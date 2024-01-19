const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const secret = require("../config/authentication.js");

exports.verifyToken = (req, res) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "Il n'y a pas de Token" });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Non authorisé" });
    }
    req.userId = decoded.id;
  });
};

exports.isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();

          return;
        }
      }
      res.status(403).json({ message: "Require Admin Role" });
      return;
    });
  });
};

exports.isUser = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
          next();

          return;
        }
      }
      res.status(403).json({ message: "Require User Role" });
      return;
    });
  });
};
