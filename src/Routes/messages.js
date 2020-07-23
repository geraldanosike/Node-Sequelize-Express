import { Router } from "express";
const {
  CreateMessage,
  GetAllMessages,
} = require("../Controllers/messageController");
const router = Router();

router.post("/createmessage", CreateMessage);
 router.get("/getallmsgs", GetAllMessages);
// router.get("/user/:id", GetAUser);
// router.put("/user/:id", UpdateUser);
// router.delete("/user/:id", DeleteUser);
// router.delete("/deleteusers", DeleteAllUser);

export default router;
