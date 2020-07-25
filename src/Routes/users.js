import { Router } from "express";
const {
  CreateUser,
  GetAllUsers,
  GetAUser,
  UpdateUser,
  DeleteUser,
  DeleteAllUser,
} = require("../Controllers/usersController");
const router = Router();

router.post("/createusers", CreateUser);
router.get("/getallusers", GetAllUsers);
router.get("/user/:id", GetAUser);
router.put("/user/:id", UpdateUser);
router.delete("/user/:id", DeleteUser);
router.delete("/deleteusers", DeleteAllUser);
//router.delete("/deleteusers", DeleteAllUser);

export default router;
