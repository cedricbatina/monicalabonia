const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const secret = require("../config/authentication.js");

exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "Il n'y a pas de Token" });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Non authorisé" });
    }
    req.userId = decoded.id;
    next(); // N'oubliez pas d'appeler next() ici
  });
};

exports.isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      let isAdmin = roles.some((role) => role.name === "admin");
      if (isAdmin) {
        next();
      } else {
        res.status(403).json({ message: "Require Admin Role" });
      }
    });
  });
};

exports.isUser = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      let isUser = roles.some((role) => role.name === "user");
      if (isUser) {
        next();
      } else {
        res.status(403).json({ message: "Require User Role" });
      }
    });
  });
};
