import connection from "../config/connection.js";

// get all articles

export const getAllArticles = (result) => {
  connection.query("SELECT * FROM articles", (err, results) => {
    if (err) {
      result.status(400).json({ message: "Le serveur a renvoyé une erreur" });
    } else {
      result(null, results);
      result.status(200).json({ results });
    }
  });
};
