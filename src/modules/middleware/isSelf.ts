import { NextFunction, Request, Response } from "express";

export const isSelf = async(req : Request, res : Response, next : NextFunction) =>{

    const loggedUser = req.user;
    const paramsId = req.params.userId;
    
    if((loggedUser!.role === "customer") && (loggedUser!.id === paramsId)){
        return next();
    }


}