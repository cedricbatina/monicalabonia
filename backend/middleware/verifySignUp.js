const User = require("../models/user.model.js");

exports.checkDuplicateEmail = (res, req) => {
  if (User.getOneUser) {
    email = req.body.email;
    res.status(500).json({ message: "Email déjà utilisé" });
  } else {
    res.status(200).json({ email });
  }
  return;
};

exports.checkRoleExisted = (res, req, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.boy.roles.length; i++) {
      if (!res.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Erreur, ce rôle n'existe pas = " + req.body.roles[i],
        });
      }
      return;
    }
  }
  next();
};
