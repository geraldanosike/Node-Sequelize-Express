import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import logger from "morgan";
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
import log from "./utils/logger";
import routes from "./Routes/routes";
//const db = require("./Sequelizedbconfig/index");
const db = require("./DBCONFIG/models/index");

dotenv.config();

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,x-auth,Accept,content-type,application/json"
  );
  next();
});
// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());
app.use(logger("dev"));

// Prevent http param pollution
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// base api

app.use("/api", routes);

// CATCH ALL INVALID ROUTES
app.use("*", (req, res, next) => {
  res.status(404).json({
    error: "Invalid route",
  });
  next();
});

process.on("uncaughtException", () => {
  log.info("WE GOT AN UNCAUGHT EXCEPTION");
  process.exit(0);
});

process.on("unhandledRejection", () => {
  log.info("WE GOT AN UNHANDLED REJECTION");
  process.exit(0);
});

db.sequelize.sync()
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//  });

process.on("SIGINT", () => {
  db.sequelize.close(); // This close the connection to the database
  console.log("Shutting down server...");
  console.log("Server successfully shutdown");
  process.exit(0);
});
const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log(`Starting Server on port ${port}...`);
});
export default app;
