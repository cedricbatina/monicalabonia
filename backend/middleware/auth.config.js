const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const connection = require("../config/connection.js");
const authentication = require("../config/authentication.js");
exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "Il n'y a pas de Token" });
  }

  jwt.verify(token, authentication, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Non authorisé" });
    }
    req.userId = decoded.id;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  const userId = req.userId;
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Erreur du serveur" });
      }

      const user = results[0];
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      connection.query(
        "SELECT * FROM user_roles WHERE user_id = ?",
        [user.id],
        (err, results) => {
          if (err) {
            return res.status(500).json({ message: "Erreur du serveur" });
          }

          const isAdmin = results.some((role) => role.role_id === 1); // Assuming 'admin' role has ID 1
          if (isAdmin) {
            next();
          } else {
            res.status(403).json({ message: "Require Admin Role" });
          }
        }
      );
    }
  );
};

exports.isUser = (req, res, next) => {
  const userId = req.userId;
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Erreur du serveur" });
      }

      const user = results[0];
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      connection.query(
        "SELECT * FROM user_roles WHERE user_id = ?",
        [user.id],
        (err, results) => {
          if (err) {
            return res.status(500).json({ message: "Erreur du serveur" });
          }

          const isUser = results.some((role) => role.role_id === 2); // Assuming 'user' role has ID 2
          if (isUser) {
            next();
          } else {
            res.status(403).json({ message: "Require User Role" });
          }
        }
      );
    }
  );
};
