import { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUser = async(req : Request, res : Response) =>{
     try{

       const result = await userService.getAllUser();

       res.status(200).json({
        success : true,
        message : "successfully found all users data by admin only",
        data : result
       })

     }catch(error){
        res.status(404).json({
            success : false,
            message : "failed to found all users data by admin",
            details : error
        })
     }
}

export const userController = {
    getAllUser
}