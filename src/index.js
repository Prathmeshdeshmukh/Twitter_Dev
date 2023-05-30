const express=  require('express');
const app = express();
const connect = require('./config/database-config');





const PORT = 5000 || process.env.PORT;
app.listen(PORT, async()=>{
    console.log('connected to PORT', PORT);
    await connect();
    console.log("mongodb connected");
    

})   