import { Request, Response } from "express";
import { bookingService } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";


const createBooking = async(req : Request, res : Response) =>{
        try{

            const result = await bookingService.createBooking(req.body);

            res.status(201).json({
                success : true,
                message : "booking creation successfully done",
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

const updateBooking = async(req : Request, res : Response) =>{
    try{
        const { bookingId } = req.params;
        const  user  = req.user;
        const status = req.body;
        
        const result = await bookingService.updateBooking(bookingId as string, user as JwtPayload, status);

        let message = "Booking cancelled successfully by customer";
        if (result.status === "returned") {
           message = "Booking marked as returned by admin. Vehicle is now available";
        }

        res.status(200).json({
            success : true,
            message ,
            data : result
        })

    }catch(error){
        const errorMessage = (error instanceof Error) ? error.message : "failed to update booking"
        res.status(400).json({
            success : false,
            message : errorMessage
        })
    }
}

export const bookingController = {
    createBooking,
    getAllBooking,
    updateBooking
}