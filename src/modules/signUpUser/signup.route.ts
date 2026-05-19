import { Router } from "express";
import { signupController } from "./signup.controller";


const router = Router();

router.post("/", signupController.signup)





export const signupRouter : Router = router;