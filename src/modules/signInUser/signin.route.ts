import { Router } from "express";
import { signinController } from "./signin.controller";
import { isSelf } from "../../middleware/isSelf";



const router = Router();


router.post("/", signinController.signin)



export const signinRouter : Router = router;