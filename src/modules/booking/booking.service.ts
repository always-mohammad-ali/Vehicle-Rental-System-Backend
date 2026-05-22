import { pool } from "../../config/database";

const createBooking = async(payload : Record<string, any>) =>{
   const {customer_id, vehicle_id, rent_start_date, rent_end_date} = payload;

   const vehicleData = await pool.query(`
    SELECT * FROM vehicles WHERE id = $1
    `, [vehicle_id])

    const vehicle = vehicleData.rows[0]

    if(!vehicle || vehicle.availability_status !== 'available'){
        throw new Error("vehicle already booked or data not found following the given vehicle id")
    }

    const startDate = new Date(rent_start_date);
    const endDate = new Date(rent_end_date);

    if(endDate <= startDate){
        throw new Error("end time could not be smaller than startDate")
    }

    const numberOfDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 24 * 60 * 60));

    const total_price = vehicle.daily_rent_price * numberOfDays;

    const newBooking = await pool.query(`
        INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES ($1, $2, $3, $4, $5, 'active') RETURNING *
        `, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price])

        await pool.query(`
            UPDATE vehicles SET availability_status = 'booked' WHERE id = $1
            `, [Number(vehicle_id)])


        return {
            ...newBooking.rows[0],
            vehicle : {
                vehicle_name : vehicle.vehicle_name,
                daily_rent_price : vehicle.daily_rent_price
            }
        }

}

 

export const bookingService = {
    createBooking
}