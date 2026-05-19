import app from "./app";
import dotenv from "dotenv"

dotenv.config();

function main(){
    
   const port = process.env.PORT || 5000;
    try{

        console.log("Database is connected");
        app.listen(port, () =>{
        console.log(`Server is running on http://localhost:${port}`);
      })
    }catch(error){
       console.log("Failed to start server", error);
       process.exit(1)
       
    }
}

main();