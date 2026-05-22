import { Request, Response } from "express";
import { bookingService } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";


const createBooking = async(req : Request, res : Response) =>{
        try{

            const result = await bookingService.createBooking(req.body);

            res.status(201).json({
                success : true,
                message : "booking creation failed",
                data : result
            })

        }catch(error){
            const errorMessage = (error instanceof Error) ? error.message : "booking creation failed"
            res.status(401).json({
                success : false,
                message : errorMessage
            
            })
            console.log(error);
        }
}


const getAllBooking = async(req : Request, res : Response) =>{
    try{

        const user = req.user;

        const result = await bookingService.getAllBooking(user as JwtPayload)

        res.status(200).json({
            success : true,
            message : "succefully fetched all booking data",
            data : result
        })

    }catch(error){
        const errorMessage = (error instanceof Error) ? error.message : "failed to fetch all booking data";
        res.status(404).json({
            success : false,
            message : errorMessage,
        })
    }
}

export const bookingController = {
    createBooking,
    getAllBooking
}