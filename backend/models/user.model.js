const connection = require("../config/connection.js");
const authentication = require("../config/authentication.js").default;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//create user

exports.createUser = (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = bcrypt.hashSync(req.body.password, 9);
  let createdAt = req.body.now();
  let updatedAt = req.body.now();
  let data = [name, email, password, createdAt, updatedAt];

  connection.query("INSERT INTO users", [data], (err, results) => {
    if (err) {
      res.status(402).json({ message: "Une erreur est survenue" });
    } else {
      res.status(201).json({ message: "Utilisateur est crée" });
      res(null, results);
    }
  });
};

// get all users
exports.getAllUsers = (result) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      result.status(403).json({ message: "Une erreur est survenue" });
    } else {
      result(null, results);
      result.status(200).json({ result });
    }
  });
};

exports.getOneUser = (id, result) => {
  connection.query("SELECT * FROM users WHERE email = ?", (err, results) => {
    if (err) {
      result.status(403).json({ message: "Une erreur est survenue" });
    } else {
      result.status(202).json();
      result(id, results);
    }
  });
};

exports.signup = (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = bcrypt.hashSync(req.body.password, 9);
  let createdAt = req.body.now();
  let updatedAt = req.body.now();
  let data = [name, email, password, createdAt, updatedAt];

  // save user to database

  connection.query("INSERT INTO users SET ? ", [data], (err, results) => {
    if (err) {
      res.status(401).json({ message: "Une erreur serveur est survenue" });
    } else if (req.body.role) {
      connection.query("SELECT * FROM roles  ", (err, results) => {
        if (err) {
          res.status(403).json({
            message:
              "Une erreur est survenue lors de la lecture de la table roles",
          });
          console.log(err);
        }
        res.status(201).json({ message: "Lecture de la table roles" });
      });
      res(null, results);
      console.log(results);
      let roleId = req.body.roleId;
      let userId = req.body.userId;
      let createdAt = req.body.now();
      let updatedAt = req.body.now();

      let data = [roleId, userId, createdAt, updatedAt];
      connection.query(
        "INSERT INTO user_roles SET ? ",
        [data],
        (err, results) => {
          if (err) {
            res
              .status(403)
              .json({ message: "Une erreur lors de l'attribution du role" });
          } else {
            res(null, results);
            res
              .status(202)
              .json({ message: "Role attribué au nouvel utilisateur" });
          }
        }
      );
    }
  });
};

exports.signin = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  connection.query(
    "SELECT FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        res.status(402).json({ message: "Une erreur est survenue" });
      } else {
        res.status(202).json({ message: "Email valide" });

        res(null, results);
        let passwordIsValid = bcrypt.compareSync(password, results.password);
        if (!passwordIsValid) {
          return res
            .status(401)
            .json({ message: "Mot de passe invalie", accessToken: null });
        } else {
          const token = jwt.sign({ id: user.id }, authentication, {
            algorithm: "HS256",
            allowInsecureKeySizes: true,
            expiresIn: 43200, // 12 hours
          });

          let authorities = [];
          let user = getOneUser();
          user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
              authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
          });
        }
      }
    }
  );
};
