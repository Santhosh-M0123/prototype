const mySql = require("mysql2");

const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "#santho01",
  database: "prototype",
});

module.exports = connection;
