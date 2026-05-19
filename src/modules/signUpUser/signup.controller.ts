import { Request, Response } from "express";
import { signupService } from "./signup.service";


const signup = async(req : Request, res : Response) =>{
    try{

        const user = req.body;

        const result = await signupService.signup(user);
        
        res.status(201).json({
            success : true,
            message : "user creation successfully done",
            data : result
        })


    }catch(error){
        const errorMessage = (error instanceof Error) ? error.message : "Failed to create user"
        res.status(401).json({
            success: false,
            message : errorMessage
        })
    }
}

export const signupController = {
    signup
}