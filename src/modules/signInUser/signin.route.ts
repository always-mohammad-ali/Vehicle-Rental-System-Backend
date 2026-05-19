import { Router } from "express";
import { signinController } from "./signin.controller";



const router = Router();


router.post("/", signinController.signin)



export const signinRouter : Router = router;