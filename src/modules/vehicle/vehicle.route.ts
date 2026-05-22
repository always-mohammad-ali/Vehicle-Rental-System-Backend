import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { isAdmin } from "../../middleware/isAdmin";
import { vehicleController } from "./vehicle.controller";

const router = Router();

//get all vehicle data
router.get("/", vehicleController.getAllVehicles)

//create vehicle post
router.post("/", authMiddleware, isAdmin, vehicleController.createVehicle)

//get specific vehicle data
router.get("/:vehicleId", vehicleController.getSingleVehicle)

//update specific vehicle data
router.put("/:vehicleId", authMiddleware, isAdmin, vehicleController.updateVehicle)

//delete specific vehicle data
router.delete("/:vehicleId", authMiddleware, isAdmin, vehicleController.deleteVehicle)



export const vehicleRouter = router;