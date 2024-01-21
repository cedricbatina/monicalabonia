require("dotenv").config();

const authentication = process.env.SECRET_KEY;
module.exports = authentication;
