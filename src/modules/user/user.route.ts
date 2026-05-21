import { Router } from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

router.get("/", authMiddleware, isAdmin, userController.getAllUser)


export const userRouter = router;