var Sequelize = require("sequelize");
var sequelize = new Sequelize({
  host: "localhost",
  database: "safety",
  username: "root",
  password: "123456",
  pool: {
    max: 5,
    min: 0,
    idle: 15 * 60 * 1000,
  },
  define: {
    freezeTableName: true,
  },
});
module.exports = sequelize;
