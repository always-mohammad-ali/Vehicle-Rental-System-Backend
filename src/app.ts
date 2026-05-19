import express, { Request, Response } from "express"
import { signupRouter } from "./modules/signUpUser/signup.route";
import { signinRouter } from "./modules/signInUser/signin.route";


const app = express();

app.use(express.json())

app.use("/api/v1/auth/signup", signupRouter)

app.use("/api/v1/auth/signin", signinRouter)

app.get("/", (req : Request, res : Response) =>{
    res.send("hello world!")
})

export default app;