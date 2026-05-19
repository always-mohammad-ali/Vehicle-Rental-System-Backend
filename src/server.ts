import app from "./app";
import config from "./config/config";
import { initDatabase } from "./config/database";


async function main(){
    
   const port = config.port || 5000;
    try{

        await initDatabase();

        console.log("Database is initialized successfully and connected");
        app.listen(port, () =>{
        console.log(`Server is running on http://localhost:${port}`);
      })
    }catch(error){
       console.log("Failed to start server", error);
       process.exit(1)
       
    }
}

main();