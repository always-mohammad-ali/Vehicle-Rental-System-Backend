import config from "../../config/config";
import { pool } from "../../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const signin = async(Payload : Record<string, any>) =>{
     const {email, password} = Payload;

     const user = await pool.query(
        'SELECT * FROM users WHERE email = $1', [email]
     )

    if(user.rows.length === 0){
        throw new Error("there is no registered user using that email, so sign up first")
     }

     const comparePassword = await bcrypt.compare(password, user.rows[0].password)


     if(comparePassword === false){
        throw new Error("enter right password")
     }

     const jwtPayLoad = {
        id : user.rows[0].id,
        name : user.rows[0].name,
        email : user.rows[0].email,
        role : user.rows[0].role
     }

     const jwtSecret =  config.jwt_secret;

     const token = jwt.sign(jwtPayLoad, jwtSecret as string, {expiresIn : '7d'})



     return {
        token,
        user : {
            id : user.rows[0].id,
            name : user.rows[0].name,
            email : user.rows[0].email,
            role : user.rows[0].role
        }
     }


}

export const signinService = {
  signin
}