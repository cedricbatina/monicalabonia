const connection = require("../config/connection.js");

// get all articles

exports.getAllArticles = (result) => {
  connection.query("SELECT * FROM articles", (err, results) => {
    if (err) {
      console.log("AFTER CRASH:", err);
      console.log(err);
      result(err, null);
    } else {
      console.log("BIEN JOUE");
      result(null, results);
    }
  });
};

// get a signle artcle
exports.fetchOne = (id, result) => {
  connection.query(
    "SELECT * FROM product WHERE product_id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};

// create an article and insert it to database

exports.insertArticle = (data, result) => {
  connection.query("INSERT INTO articles SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
    } else {
      result(null, results);
    }
  });
};

/// update article
exports.updateArticle = (data, id, result) => {
  connection.query(
    "UPDATE article SET title = ?, content = ?, WHERE id = ?",
    [data.title, data.content, id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(null, err);
      } else {
        result(null, results);
      }
    }
  );
};

// suppress an article

exports.deleteArticle = (id, result) => {
  connection.query(
    "DELETE FROM articles WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(null, err);
      } else {
        result(null, results);
      }
    }
  );
};
