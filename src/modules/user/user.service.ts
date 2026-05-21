import { pool } from "../../config/database"

const getAllUser = async() =>{
     const result = await pool.query(`
        SELECT * FROM users

        `)

        return result
}

export const userService = {
    getAllUser
}