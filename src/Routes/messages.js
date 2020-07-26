import { Router } from "express";
const {
  CreateMessage,
  GetAllMessages,
  getAmessage,
} = require("../Controllers/messageController");
const router = Router();

router.post("/createmessage", CreateMessage);
 router.get("/getallmsgs", GetAllMessages);
router.get("/message/:id", getAmessage);
// router.put("/user/:id", UpdateUser);
// router.delete("/user/:id", DeleteUser);
// router.delete("/deleteusers", DeleteAllUser);

export default router;
