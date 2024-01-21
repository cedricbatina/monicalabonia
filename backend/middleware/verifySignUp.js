const User = require("../models/user.model.js");

exports.checkDuplicateEmail = (req, res, next) => {
  const email = req.body.email;
  User.findOne({ where: { email: email } }).then((user) => {
    if (user) {
      res.status(500).json({ message: "Email déjà utilisé" });
    } else {
      next();
    }
  });
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
