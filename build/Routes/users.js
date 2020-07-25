"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

const {
  CreateUser,
  GetAllUsers,
  GetAUser,
  UpdateUser,
  DeleteUser,
  DeleteAllUser
} = require("../Controllers/usersController");

const router = (0, _express.Router)();
router.post("/createusers", CreateUser);
router.get("/getallusers", GetAllUsers);
router.get("/user/:id", GetAUser);
router.put("/user/:id", UpdateUser);
router.delete("/user/:id", DeleteUser);
router.delete("/deleteusers", DeleteAllUser);
var _default = router;
exports.default = _default;
//# sourceMappingURL=users.js.map