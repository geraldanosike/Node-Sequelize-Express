"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv.default.config();

const SALT_WORK_FACTOR = _bcryptjs.default.genSaltSync(5);

const helper = {
  // Hash password with bcrypt
  hashPassword: function () {
    var _ref = _asyncToGenerator(function* (plaintextPassword, saltFactor = SALT_WORK_FACTOR) {
      const hash = yield _bcryptjs.default.hash(plaintextPassword, saltFactor);
      return hash;
    });

    return function hashPassword(_x) {
      return _ref.apply(this, arguments);
    };
  }(),
  // compare hashed password
  comparePassword: function () {
    var _ref2 = _asyncToGenerator(function* (plaintextPassword, hashPassword) {
      const compare = yield _bcryptjs.default.compare(plaintextPassword, `${hashPassword}`);
      return compare;
    });

    return function comparePassword(_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }(),
  // generate token
  generateToken: (type, payload, expiry = process.env.TOKEN_EXPIRES_IN) => {
    payload.type = type;
    return _jsonwebtoken.default.sign(payload, process.env.JWT_SECRET, {
      expiresIn: expiry
    });
  },
  // generate uniqueID
  generateUniqueId: () => "twbd7std7862teggd78w"
};
var _default = helper;
exports.default = _default;
//# sourceMappingURL=helper.js.map