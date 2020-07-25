"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

const {
  CreateMessage,
  GetAllMessages
} = require("../Controllers/messageController");

const router = (0, _express.Router)();
router.post("/createmessage", CreateMessage);
router.get("/getallmsgs", GetAllMessages); // router.get("/user/:id", GetAUser);
// router.put("/user/:id", UpdateUser);
// router.delete("/user/:id", DeleteUser);
// router.delete("/deleteusers", DeleteAllUser);

var _default = router;
exports.default = _default;
//# sourceMappingURL=messages.js.map