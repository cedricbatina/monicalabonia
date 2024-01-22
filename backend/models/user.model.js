const connection = require("../config/connection.js");
const authentication = require("../config/authentication.js").default;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

////signin

// signin
exports.signin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        return res.status(402).json({ message: "Une erreur est survenue" });
      }

      if (results.length === 0) {
        return res.status(401).json({
          message: "Aucun utilisateur trouvé avec cet email",
          accessToken: null,
        });
      }

      const user = results[0];

      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return res
          .status(401)
          .json({ message: "Mot de passe invalide", accessToken: null });
      }

      const token = jwt.sign({ id: user.id }, authentication, {
        algorithm: "HS256",
        expiresIn: 43200, // 12 hours
      });

      // Récupérer les rôles de l'utilisateur
      connection.query(
        "SELECT r.name FROM roles r INNER JOIN user_roles ur ON r.id = ur.role_id WHERE ur.user_id = ?",
        [user.id],
        (err, rolesResult) => {
          if (err) {
            return res.status(403).json({
              message:
                "Une erreur lors de la récupération des rôles de l'utilisateur",
              accessToken: null,
            });
          }

          const authorities = rolesResult.map(
            (role) => `ROLE_${role.name.toUpperCase()}`
          );

          res.status(202).json({
            message: "Authentification réussie",
            accessToken: token,
            authorities: authorities,
          });
        }
      );
    }
  );
};

//// signup

exports.signup = (req, res) => {
  const { name, email, password, role } = req.body;
  const createdAt = new Date();
  const updatedAt = new Date();
  const hashedPassword = bcrypt.hashSync(password, 9);

  const userData = [name, email, hashedPassword, createdAt, updatedAt];

  connection.query("INSERT INTO users SET ?", [userData], (err, userResult) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Une erreur serveur est survenue" });
    }

    if (role) {
      const roleId =
        /* Obtenez l'ID du rôle en fonction de votre logique */ userResult.role;
      const userId = userResult.insertId; // ID de l'utilisateur créé

      const userRolesData = [roleId, userId, createdAt, updatedAt];

      connection.query(
        "INSERT INTO user_roles SET ?",
        [userRolesData],
        (err) => {
          if (err) {
            return res
              .status(403)
              .json({ message: "Une erreur lors de l'attribution du rôle" });
          }

          // Affiche le rôle de l'utilisateur s'il en a un
          connection.query(
            "SELECT r.name FROM roles r INNER JOIN user_roles ur ON r.id = ur.role_id WHERE ur.user_id = ?",
            [userId],
            (err, rolesResult) => {
              if (err) {
                return res.status(403).json({
                  message:
                    "Une erreur lors de la récupération du rôle de l'utilisateur",
                });
              }

              const userRole = rolesResult[0] ? rolesResult[0].name : null;

              res.status(201).json({
                message: "Utilisateur créé avec attribution de rôle",
                userRole: userRole,
              });
            }
          );
        }
      );
    } else {
      // Aucun rôle n'est spécifié
      res
        .status(201)
        .json({ message: "Utilisateur créé sans attribution de rôle" });
    }
  });
};

// create user
exports.createUser = (req, res) => {
  const { name, email, password } = req.body;
  const createdAt = new Date();
  const updatedAt = new Date();
  const data = [
    name,
    email,
    bcrypt.hashSync(password, 9),
    createdAt,
    updatedAt,
  ];

  connection.query("INSERT INTO users SET ?", [data], (err, results) => {
    if (err) {
      return res.status(402).json({ message: "Une erreur est survenue" });
    }

    res
      .status(201)
      .json({ message: "Utilisateur créé", user: results.insertId });
  });
};

// get all users

// get all users
exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM users", (err, results) => {
      if (err) {
        reject({ status: 403, message: "Une erreur est survenue" });
      } else {
        resolve(results);
      }
    });
  });
};

// get one user by ID
exports.getOneUser = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE id = ?",
      [id],
      (err, results) => {
        if (err) {
          reject({ status: 403, message: "Une erreur est survenue" });
        } else {
          if (results.length === 0) {
            reject({
              status: 401,
              message: "Aucun utilisateur trouvé avec cet ID",
            });
          } else {
            resolve(results[0]); // Renvoie le premier utilisateur trouvé
          }
        }
      }
    );
  });
};

////// signup
