const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "cedricbatina",
  password: "Elijahbatina2008",
  database: "monicalabonia",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Server!");
});
module.exports = connection;
