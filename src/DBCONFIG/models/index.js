"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
import dotenv from "dotenv";
dotenv.config();

const db = {};

const connectionUrl =
  process.env.NODE_ENV === "development"
    ? process.env.DB_URL
    : process.env.NODE_ENV === "test"
    ? process.env.LOCAL_HOSTNAME
    : "No database configuration set";

// const sequelize = new Sequelize(
//   process.env.DB_NAME_LOCAL,
//   process.env.DB_USER_LOCAL,
//   process.env.DB_PSWD_LOCAL,
//   {
//     host: process.env.DB_URL_LOCAL,
//     dialect: process.env.DB_DIALECT_LOCAL,
//   }

const sequelize = new Sequelize(connectionUrl);

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();
}

init();

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
