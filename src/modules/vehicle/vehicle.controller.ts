import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const createVehicle = async(req : Request, res : Response) =>{

    try{

        const vehicleData = req.body;

        const result = await vehicleService.createVehicle(vehicleData);

        res.status(201).json({
            success : true,
            message : "vehicle created successfully",
            data : result
        })

    }catch(error){
        res.status(400).json({
            success : false,
            message : "vehicle creation failed",
            details : error
        })
    }
      
}

export const vehicleController = {
    createVehicle
}