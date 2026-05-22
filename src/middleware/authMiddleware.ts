import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";

export const authMiddleware = async(req : Request, res : Response, next : NextFunction) =>{
    try{

        const header = req.headers.authorization;

    if(!header){
        return res.status(404).json({
            success : false,
            message : "No token found!",

        })
    }

    const token = header.split(" ")[1];
    const jwtSecret = config.jwt_secret

    const decoded = jwt.verify(token as string, jwtSecret!);

    req.user = decoded as JwtPayload;

    next()

    }catch(error){
        res.status(401).json({
            success : false,
            message : "The token was invalid or expired"
        })
    }
    
}