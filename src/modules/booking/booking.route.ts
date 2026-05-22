import e, { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { isAdminOrSelf } from "../../middleware/isAdminOrSelf";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/", authMiddleware, bookingController.createBooking)

router.get("/", authMiddleware, bookingController.getAllBooking)

router.put("/:bookingId", authMiddleware, bookingController.updateBooking)


export const bookingRouter = router;