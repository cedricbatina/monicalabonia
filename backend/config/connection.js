const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "cedricbatina",
  password: "Elijahbatina2008",
  database: "monicalabonia",
});
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
});
console.log("Connected to database");

module.exports = connection;
