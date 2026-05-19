import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/isAdmin";
import { vehicleController } from "./vehicle.controller";

const router = Router();

router.post("/", authMiddleware, isAdmin, vehicleController.createVehicle)

export const vehicleRouter = router;