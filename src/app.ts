import express, { Request, Response } from "express"
import { signupRouter } from "./modules/signUpUser/signup.route";
import { signinRouter } from "./modules/signInUser/signin.route";
import { vehicleRouter } from "./modules/vehicle/vehicle.route";
import { userRouter } from "./modules/user/user.route";


const app = express();

app.use(express.json())

app.use("/api/v1/auth/signup", signupRouter)

app.use("/api/v1/auth/signin", signinRouter)

app.use("/api/v1/vehicles", vehicleRouter)

app.use("/api/v1/users", userRouter)

app.get("/", (req : Request, res : Response) =>{
    res.send("hello world!")
})

export default app;