const mysql = require("mysql2");
exports.getConnection = function () {
  let connection = mysql.createConnection({
    host: "localhost",
    database: "safety",
    user: "root",
    password: "123456",
  });
  connection.connect();
  return connection;
};
