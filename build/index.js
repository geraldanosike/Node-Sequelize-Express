"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _helmet = _interopRequireDefault(require("helmet"));

var _morgan = _interopRequireDefault(require("morgan"));

var _logger = _interopRequireDefault(require("./utils/logger"));

var _routes = _interopRequireDefault(require("./Routes/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const xss = require("xss-clean");

const rateLimit = require("express-rate-limit");

const hpp = require("hpp");

//const db = require("./Sequelizedbconfig/index");
const db = require("./DBCONFIG/models/index");

_dotenv.default.config();

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,x-auth,Accept,content-type,application/json");
  next();
}); // Set security headers

app.use((0, _helmet.default)()); // Prevent XSS attacks

app.use(xss());
app.use((0, _morgan.default)("dev")); // Prevent http param pollution

app.use(hpp()); // Rate limiting

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  // 10 mins
  max: 100
});
app.use(limiter); // Parse incoming requests data

app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
})); // base api

app.use("/api", _routes.default); // CATCH ALL INVALID ROUTES

app.use("*", (req, res, next) => {
  res.status(404).json({
    error: "Invalid route"
  });
  next();
});
process.on("uncaughtException", () => {
  _logger.default.info("WE GOT AN UNCAUGHT EXCEPTION");

  process.exit(0);
});
process.on("unhandledRejection", () => {
  _logger.default.info("WE GOT AN UNHANDLED REJECTION");

  process.exit(0);
});
db.sequelize.sync(); // // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//  });

process.on("SIGINT", () => {
  db.sequelize.close(); // This close the connection to the database

  console.log("Shutting down server...");
  console.log("Server successfully shutdown");
  process.exit(0);
});
app.listen(process.env.PORT, () => {
  console.log(`Starting Server on port ${process.env.PORT}...`);
});
var _default = app;
exports.default = _default;
//# sourceMappingURL=index.js.map