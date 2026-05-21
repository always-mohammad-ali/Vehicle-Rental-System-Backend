import { pool } from "../../config/database"


const getAllVehicles = async() =>{
    const result = await pool.query(
        `SELECT * FROM vehicles`
    )
    return result;
}

const createVehicle = async(Payload : Record<string, any>) =>{
    const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = Payload

    const result = await pool.query(
        `INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING vehicle_name, type, registration_number, daily_rent_price, availability_status`, 
        [vehicle_name, type, registration_number, daily_rent_price, availability_status]
    )

    return result.rows[0]
}

export const vehicleService = {
    getAllVehicles,
    createVehicle
}

