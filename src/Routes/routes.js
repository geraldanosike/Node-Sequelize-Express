import { Router } from "express";
import usersRouter from "./users";
import MessageRouter from "./messages";
const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome Home",
  });
});

router.use("/", usersRouter);
router.use("/", MessageRouter);
export default router;
