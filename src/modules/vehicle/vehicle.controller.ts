import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const getAllVehicles = async(req : Request, res : Response) =>{
     try{

        const result = await vehicleService.getAllVehicles();

        res.status(200).json({
            success : true,
            message : "get all vehicles by public successfully",
            data : result
        })

     }catch(error){
        res.status(404).json({
            success : false,
            message : "get all vehicles by public failed",
            details : error
        })
     }
}

const getSingleVehicle = async(req : Request, res : Response) =>{
     try{

        const { vehicleId } = req.params;

        const result = await vehicleService.getSingleVehicle(vehicleId as string);

        res.status(200).json({
            success : true,
            message : "get single vehicle by public successfully",
            data : result
        })

       // console.log(result);

     }catch(error){
        res.status(404).json({
            success : false,
            message : "get single vehicle by public failed",
            details : error
        })
     }
}



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
    getAllVehicles,
    getSingleVehicle,
    createVehicle
}