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

const getAllBooking = async(payload : Record<string, any>) =>{
      await pool.query(`
        UPDATE bookings SET status='returned' WHERE rent_end_date < CURRENT_DATE AND status='active'
        `)


      await pool.query(`
        UPDATE vehicles SET availability_status = 'available' WHERE id IN( SELECT vehicle_id FROM bookings WHERE  rent_end_date < CURRENT_DATE AND status = 'returned' )
        `)


     if(payload.role === "admin"){
        const bookings = await pool.query(`
            SELECT
             b.*,
             u.name as customer_name,
             u.email as customer_email,
             u.role as customer_role,
             v.vehicle_name,
             v.registration_number
             FROM bookings b
             JOIN users u ON b.customer_id = u.id
             JOIN vehicles v ON b.vehicle_id = v.id
            `)

            return bookings.rows.map((b) =>({
                id : b.id,
                customer_id : b.customer_id,
                vehicle_id : b.vehicle_id,
                rent_start_date : b.rent_start_date,
                rent_end_date : b.rent_end_date,
                total_price : b.total_price,
                status : b.status,
                customer : {
                    name : b.customer_name,
                    email : b.customer_email,
                    role : b.customer_role
                },
                vehicle : {
                    vehicle_name : b.vehicle_name,
                    registration_number : b.registration_number
                }
            }))
     }

     //customer

     const bookings = await pool.query(`
        SELECT
          b.*,
          v.vehicle_name,
          v.type,
          v.registration_number,
          v.availability_status
        FROM bookings b
        JOIN vehicles v ON b.vehicle_id = v.id
        WHERE b.customer_id = $1
        `, [payload.id])

        return bookings.rows.map((b) => ({
            id : b.id,
            customer_id : b.customer_id,
            vehicle_id : b.vehicle_id,
            rent_start_date : b.rent_start_date,
            rent_end_date : b.rent_end_date,
            total_price : b.total_price,
            status : b.status,
            vehicle : {
                vehicle_name : b.vehicle_name,
                type : b.type,
                registration_number : b.registration_number,
                availability_status : b.availability_status
            }

        }))
}

 

export const bookingService = {
    createBooking,
    getAllBooking
}