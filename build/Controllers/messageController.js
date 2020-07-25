"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const asyncHandler = require("../Middlewares/async");

const {
  getIdParam
} = require("../utils/validateId");

const db = require("../DBCONFIG/models/index");

const User = db.User;
const Message = db.Message;
const Op = db.Sequelize.Op;
exports.CreateMessage = asyncHandler( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      const Messages = yield Message.create(req.body);
      return res.status(201).send({
        message: "Message created successfully",
        Messages
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
exports.GetAllMessages = asyncHandler( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      const msg = yield Message.findAll({
        include: [{
          model: User,
          as: "author"
        }]
      });
      if (!msg) return res.status(404).send("No messages exist");
      return res.status(200).send({
        message: "Successfuly retrieved messages",
        msg
      });
    } catch (error) {
      return res.status(500).send(error.message || "Some error occurred while retrieving messages.");
    }
  });

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
//# sourceMappingURL=messageController.js.map