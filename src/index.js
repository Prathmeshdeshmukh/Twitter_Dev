const express=  require('express');
const app = express();
const connect = require('./config/database-config');
const TweetRepository = require('./repository/tweet-repository');
const Comment = require('../models/comment');


const PORT = 5000 || process.env.PORT;
app.listen(PORT, async()=>{
    console.log('connected to PORT', PORT);
    await connect();
    console.log("mongodb connected");
    const tweetRepo = new TweetRepository();

    const tweet = await tweetRepo.getwithComment('64718c39c52767afd9f53407');
    // const comment = await Comment.create({content:'new comment on new tweet1'});
    
    console.log(tweet.id);
    
})   