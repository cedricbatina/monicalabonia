const mysql = require("mysql2");
require("dotenv").config();
const connection = process.env.connection;
module.exports = connection;
