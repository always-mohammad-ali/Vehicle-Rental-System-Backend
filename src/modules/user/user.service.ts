import { pool } from "../../config/database"

const getAllUser = async() =>{
     const result = await pool.query(`
        SELECT * FROM users

        `)

        return result
}

const updateUser = async(userId : string, payload : Record<string, any>) =>{
         const {name, email, phone, role} = payload;

    /*    let finalRole = role;

         if(role && currentRole !== 'admin'){
            finalRole = undefined
            throw new Error("customer is trying to change role, which is not possible");
         }
    */
         const result = await pool.query(`
            UPDATE users SET
             name = COALESCE($1, name),
             email = COALESCE($2, email),
             phone = COALESCE($3, phone),
             role = COALESCE($4, role)
             
             WHERE id=$5 RETURNING *
            
            `, [
                name,
                email,
                phone,
                role,
                userId
            ])

            return result.rows[0]
}

const deleteUser = async(userId : string) =>{
      
     const checkActiveStatus = await pool.query(`
          SELECT * FROM bookings WHERE customer_id=$1 AND status = 'active'
          `, [userId])

     if(checkActiveStatus.rows.length > 0){
          throw new Error("you cant delete that user with active status in booking")
     }

     const result = await pool.query(`
          DELETE FROM users WHERE id = $1 RETURNING *
          `, [userId])

     return result.rows[0]
}

export const userService = {
    getAllUser,
    updateUser,
    deleteUser
}