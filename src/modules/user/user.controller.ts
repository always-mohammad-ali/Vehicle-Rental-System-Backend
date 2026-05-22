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

const updateUser = async(req : Request, res : Response) =>{
     try{
       const { userId } = req.params;
       const currentRole = req.user?.role;
       
       if(currentRole !== 'admin' && req.body.role){
        delete req.body.role
        
       }
       
       const result = await userService.updateUser(userId as string, req.body);

       res.status(200).json({
        success : true,
        message : "successfully update user data by admin or customer",
        data : result
       })

     }catch(error){
        res.status(401).json({
            success : false,
            message : "failed to update user data by admin or customer",
            details : error
        })
     }
}



export const userController = {
    getAllUser,
    updateUser
}