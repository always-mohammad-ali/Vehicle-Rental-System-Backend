import { pool } from "../../config/database"


const getAllVehicles = async() =>{
    const result = await pool.query(
        `SELECT * FROM vehicles`
    )
    return result;
}

const getSingleVehicle = async(vehicleId : string) =>{
    const result = await pool.query(
        `SELECT * FROM vehicles WHERE id = $1`,[vehicleId]
    )
    return result.rows[0];
}

const updateVehicle = async(vehicleId : string, payload : Record<string, any>) =>{

    const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = payload;

    const result = await pool.query(`
            UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id = $6 RETURNING *
        `, [
            vehicle_name,
            type,
            registration_number,
            daily_rent_price,
            availability_status,
            vehicleId
        ])

     return result.rows[0]   
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
    getSingleVehicle,
    updateVehicle,
    createVehicle
}

