import { pool } from "../../config/database";
import bcrypt from "bcrypt"


const signup = async(Payload : Record<string, any>) =>{
      
    const {name, email, password, phone, role} = Payload;


    if(!name || !email || !password || !phone || !role){
        throw new Error("you can't miss any user data to insert")
    }

    if(!['customer', 'admin'].includes(role)){
        throw new Error("role must be either customer or admin")
    }

    const existingUser = await pool.query(
        'SELECT id FROM users WHERE email = $1', [email]
    )
    
    if(existingUser.rows.length > 0){
        throw new Error("email already registered")
    }

    const existingPhone = await pool.query(
        'SELECT id FROM users WHERE phone = $1', [phone]
    )

    if(existingPhone.rows.length > 0){
        throw new Error("phone number already registered")
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        'INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role',
        [name, email, hashedPassword, phone, role]
    )

    return result.rows[0];


}


export const signupService = {
    signup
}