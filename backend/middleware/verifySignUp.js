const connection = require("../config/connection.js");

exports.checkDuplicateEmail = (req, res, next) => {
  const email = req.body.email;

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ message: "Une erreur est survenue" });
      }

      if (results.length > 0) {
        return res.status(500).json({ message: "Email déjà utilisé" });
      }

      next();
    }
  );
};

exports.checkRoleExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!["admin", "user"].includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Erreur, ce rôle n'existe pas = " + req.body.roles[i],
        });
        return;
      }
    }
  }
  next();
};
