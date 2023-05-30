import express from 'express'
const app = express();
import connect from './config/database-config.js';





const PORT = 5000 || process.env.PORT;
app.listen(PORT, async()=>{
    console.log('connected to PORT', PORT);
    await connect();
    console.log("mongodb connected");
    
 
})   