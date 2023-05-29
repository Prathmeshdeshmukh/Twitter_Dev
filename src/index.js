const express=  require('express');
const app = express();
const connect = require('./config/database-config');
const TweetRepository = require('./repository/tweet-repository');
// const Comment = require('./models/comment');
// const Tweet = require('./models/tweet');
const TweetService = require('./services/tweet-service');
const HashtagRepository = require('./repository/hashtag-repository');
const Tweet = require('./models/tweet');




const PORT = 5000 || process.env.PORT;
app.listen(PORT, async()=>{
    console.log('connected to PORT', PORT);
    await connect();
    console.log("mongodb connected");
    const service = new TweetService();
    const tweet = await service.create({
        content : '#tech life so #excited #python #cse'
    })
    console.log(tweet);

})   