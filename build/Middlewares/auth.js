"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const jwt = require("jsonwebtoken");

const asyncHandler = require("./async");

const ErrorResponse = require("../utils/errorResponse");

const User = require("../models/User"); // Protect routes


exports.protect = asyncHandler( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      // Set token from Bearer token in header
      token = req.headers.authorization.split(" ")[1]; // Set token from cookie
    } // else if (req.cookies.token) {
    //   token = req.cookies.token;
    // }
    // Make sure token exists


    if (!token) {
      return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = yield User.findById(decoded.id);
      next();
    } catch (err) {
      return next(new ErrorResponse("Not authorized to access this route", 401));
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()); // Grant access to specific roles

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403));
    }

    next();
  };
};
//# sourceMappingURL=auth.js.map