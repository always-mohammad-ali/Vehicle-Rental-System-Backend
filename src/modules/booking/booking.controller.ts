import { Request, Response } from "express";
import { bookingService } from "./booking.service";


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

export const bookingController = {
    createBooking
}