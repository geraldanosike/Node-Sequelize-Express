"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = _interopRequireDefault(require("winston"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-shadow */
_dotenv.default.config();

const CONSOLE_DATE_FORMAT = "HH:mm:ss.SSS";
/**
 * Factory method to create a logger with the parameters provided
 * @param {string} label Log label
 * @param {string} level Log level e.g info, debug, warn
 * @param {string} filename Filename to write logs
 * @returns {winston.Logger} Logger
 */

const createLogger = () => {
  const label = process.env.LOG_LABEL;
  const level = process.env.LOG_LEVEL;
  const filename = process.env.LOG_FILE;

  const logger = _winston.default.createLogger({
    level
  }); // Console transport for display messages in the terminal


  logger.add(new _winston.default.transports.Console({
    format: _winston.default.format.combine(_winston.default.format.colorize(), _winston.default.format.label({
      label
    }), _winston.default.format.timestamp({
      format: CONSOLE_DATE_FORMAT
    }), _winston.default.format.splat(), _winston.default.format.printf(({
      level,
      message,
      label,
      timestamp
    }) => `${timestamp} [${label}] ${level}: ${message}`))
  })); // If a filename is specified, create a file logger

  if (typeof filename === "string" && filename.length) {
    logger.add(new _winston.default.transports.File({
      filename,
      format: _winston.default.format.combine(_winston.default.format.label({
        label
      }), _winston.default.format.timestamp(), _winston.default.format.splat(), _winston.default.format.uncolorize(), _winston.default.format.json())
    }));
  }

  return logger;
};

const logger = createLogger();
var _default = logger;
exports.default = _default;
//# sourceMappingURL=logger.js.map