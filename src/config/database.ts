import {Pool} from "pg";
import config from "./config";

export const pool = new Pool({
     connectionString : config.database_url
})

export const initDatabase = async() =>{
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
               id SERIAL PRIMARY KEY,
               name VARCHAR(100) NOT NULL,
               email VARCHAR(100) UNIQUE NOT NULL,
               password VARCHAR(255) NOT NULL,
               phone VARCHAR(100) UNIQUE NOT NULL,
               role VARCHAR(50) DEFAULT('customer') CHECK (role IN('customer', 'admin'))
            )
            
            `);

          
        await pool.query(`
             CREATE TABLE IF NOT EXISTS vehicles(
             id SERIAL PRIMARY KEY,
             vehicle_name VARCHAR(100) NOT NULL,
             type VARCHAR(100) NOT NULL CHECK (type IN('car', 'van', 'bike', 'SUV')),
             registration_number VARCHAR(100) UNIQUE NOT NULL,
             daily_rent_price INT NOT NULL CHECK(daily_rent_price > 0),
             availability_status VARCHAR(50) DEFAULT('available') CHECK(availability_status IN('available', 'booked'))
             )
            `);

        await pool.query(`
             CREATE TABLE IF NOT EXISTS bookings(
             id SERIAL PRIMARY KEY,
             customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
             vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
             rent_start_date TIMESTAMP DEFAULT NOW() CHECK(rent_start_date >= CURRENT_DATE),
             rent_end_date TIMESTAMP CHECK(rent_end_date > rent_start_date),
             total_price INT NOT NULL CHECK(total_price > 0),
             status VARCHAR(100) DEFAULT('active') CHECK(status IN('active', 'cancelled', 'returned'))

             )
            `)
         console.log("DB table creation done");
    }catch(error){
        console.log("database initialization failed", error);
    }
}