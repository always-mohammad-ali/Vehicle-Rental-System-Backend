import { NextFunction, Request, Response } from "express";

export const isAdminOrSelf = async(req : Request, res : Response, next : NextFunction) =>{

    const user = req.user;
    const paramId = req.params.userId;
    if(user!.role === "admin"){
        return next()
    }

    if(user!.id === Number(paramId)){
        return next()
    }

    return res.status(403).json({ message : "access denied"})
}