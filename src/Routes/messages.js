import { Router } from "express";
const {
  CreateMessage,
  GetAllMessages,
  getAmessage,
  UpdateMsg,
  DeleteMsg,
} = require("../Controllers/messageController");
const router = Router();

router.post("/createmessage", CreateMessage);
 router.get("/getallmsgs", GetAllMessages);
router.get("/message/:id", getAmessage);
router.put("/message/:id", UpdateMsg);
router.delete("/message/:id", DeleteMsg);
// router.delete("/deleteusers", DeleteAllUser);

export default router;
