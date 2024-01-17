import { connection } from "../config/connection";

export const role = (result) => {
  connection.query("SELECT * FROM role", (err, results) => {
    if (err) {
      result.status(401).json({ message: "Une erreur est survenue" });
    } else {
      result(null, results);
      result.status(201).json({ results });
    }
  });
};
