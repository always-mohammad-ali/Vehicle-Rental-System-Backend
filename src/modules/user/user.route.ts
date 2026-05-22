import { Router } from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import { isAdmin } from "../../middleware/isAdmin";
import { isAdminOrSelf } from "../../middleware/isAdminOrSelf";

const router = Router();

router.get("/", authMiddleware, isAdmin, userController.getAllUser);

router.put("/:userId", authMiddleware, isAdminOrSelf, userController.updateUser);

router.delete("/:userId", authMiddleware, isAdmin, userController.deleteUser);


export const userRouter = router;