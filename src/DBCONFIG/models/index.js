"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
import dotenv from "dotenv";
dotenv.config();

//const config = require(__dirname + "/../config/config.json")[env];
const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

const sequelize = new Sequelize(
  process.env.DB_NAME_LOCAL,
  process.env.DB_USER_LOCAL,
  process.env.DB_PSWD_LOCAL,
  {
    host: process.env.DB_URL_LOCAL,
    dialect: process.env.DB_DIALECT_LOCAL,
  }
);

sequelize.authenticate().then(() => {
  console.log("Database connection OK OOOOO");
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Define Model relationships here
db.User = require("./user")(sequelize, Sequelize);
db.Message = require("./message")(sequelize, Sequelize);
db.Like = require("./like")(sequelize, Sequelize);

db.User.hasMany(db.Message, {
  foreignKey: "userId",
  as: "messages",
  onDelete: "CASCADE",
});
db.User.hasOne(db.Like, {
  foreignKey: "userId",
  as: "likes",
  onDelete: "CASCADE",
});
db.Message.belongsTo(db.User, {
  foreignKey: "userId",
  as: "author",
  onDelete: "CASCADE",
});
db.Like.belongsTo(db.User, {
  foreignKey: "userId",
  as: "authorlikes",
  onDelete: "CASCADE",
});
module.exports = db;
