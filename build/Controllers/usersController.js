"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const asyncHandler = require("../Middlewares/async");

const {
  getIdParam
} = require("../utils/validateId");

const db = require("../DBCONFIG/models/index");

const User = db.User;
const Message = db.message;
const Op = db.Sequelize.Op;
exports.CreateUser = asyncHandler( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      const {
        email
      } = req.body;
      const findUser = yield User.findOne({
        where: {
          email: email
        }
      });
      if (findUser) return res.status(400).send("User already exists");
      const users = yield User.create(req.body);
      return res.status(201).send({
        message: "User created successfully",
        users
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
exports.GetAllUsers = asyncHandler( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      const users = yield User.findAll({
        include: [{
          model: Message,
          as: "messages"
        }]
      });
      if (!users) return res.status(404).send("No users exist");
      return res.status(200).send({
        message: "Successfuly retrieved users",
        users
      });
    } catch (error) {
      return res.status(500).send(error.message || "Some error occurred while retrieving users.");
    }
  });

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
exports.GetAUser = asyncHandler( /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    const id = getIdParam(req);

    try {
      const user = yield User.findByPk(id, {
        include: [{
          model: Message,
          as: "messages"
        }]
      });
      if (!user) return res.status(404).send("This user does not exist");
      return res.status(200).send({
        message: "Successfuly retrieved users",
        user
      });
    } catch (error) {
      return res.status(500).send(error.message || "Some error occurred while retrieving user.");
    }
  });

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
exports.UpdateUser = asyncHandler( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res, next) {
    const id = getIdParam(req);

    try {
      const user = yield User.update(req.body, {
        where: {
          id: id
        }
      });
      if (!user) return res.status(404).send("Error updating user");
      return res.status(200).send({
        message: "Successfuly updated user"
      });
    } catch (error) {
      return res.status(500).send(error.message || "Some error occurred while updating user.");
    }
  });

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
exports.DeleteUser = asyncHandler( /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res, next) {
    const id = getIdParam(req);

    try {
      const u = yield User.findByPk(id);
      if (u.isAdmin) return res.status(404).send("Error! you cant delete an Admin");
      const user = yield User.destroy({
        where: {
          id: id
        }
      });
      if (!user) return res.status(404).send("Error! User does not exist");
      return res.status(200).send({
        message: "Successfuly deleted user"
      });
    } catch (error) {
      return res.status(500).send(error.message || "Some error occurred while deleting user.");
    }
  });

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}());
exports.DeleteAllUser = asyncHandler( /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res, next) {
    try {
      const user = yield User.destroy({
        where: {},
        truncate: false
      });
      if (!user) return res.status(404).send("Error deleting users.");
      return res.status(200).send({
        message: "Successfuly deleted all users."
      });
    } catch (error) {
      return res.status(500).send(error.message || "Some error occurred while deleting users.");
    }
  });

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}());
//# sourceMappingURL=usersController.js.map