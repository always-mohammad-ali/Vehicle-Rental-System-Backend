import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/isAdmin";
import { vehicleController } from "./vehicle.controller";

const router = Router();

router.get("/", vehicleController.getAllVehicles)


router.post("/", authMiddleware, isAdmin, vehicleController.createVehicle)


router.get("/:vehicleId", vehicleController.getSingleVehicle)



export const vehicleRouter = router;