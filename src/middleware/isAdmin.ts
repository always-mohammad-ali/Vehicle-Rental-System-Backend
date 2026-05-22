import { NextFunction, Request, Response } from "express";

export const isAdmin = async(req : Request, res : Response, next : NextFunction) =>{
    if(!req.user){
        throw new Error("you are not authenticated")
    }
    if(req.user.role !== "admin"){
        throw new Error("you don't have permission as a customer")
    }

    next();
}