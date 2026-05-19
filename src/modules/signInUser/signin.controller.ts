import { Request, Response } from "express";
import { signinService } from "./signin.service";


const signin = async(req : Request, res : Response) =>{
      try{

        const user = req.body;

        const result = await signinService.signin(user);
        
        res.status(201).json({
            success : true,
            message : "user sign in successfully done",
            data : result
        })


    }catch(error){
        const errorMessage = (error instanceof Error) ? error.message : "Failed to sign in user"
        res.status(401).json({
            success: false,
            message : errorMessage
        })
    }
}


export const signinController = {
    signin
}