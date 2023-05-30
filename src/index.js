import express from 'express'
const app = express();
import connect from './config/database-config.js';
import TweetService from './services/tweet-service.js';




const PORT = 5000 || process.env.PORT;
app.listen(PORT, async()=>{
    console.log('connected to PORT', PORT);
    await connect();
    console.log("mongodb connected");
    let service = new TweetService();
    const tweet = await service.create({
        content : "capital #WORKS"
    })
    console.log(tweet)
    
})   