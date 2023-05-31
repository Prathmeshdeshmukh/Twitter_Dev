import express from 'express'
import bodyParser from 'body-parser';
import connect from './config/database-config.js';
import router from './routes/index.js';
import { LikeRepository , TweetRepository, UserRepository } from './repository/index.js';
import LikeService from './services/like-service.js';

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/api', router);
app.listen(PORT, async()=>{


    console.log('connected to PORT', PORT);
    await connect();
    console.log("mongodb connected");
    const userRepo = new UserRepository();
    const users = await userRepo.getAll();
    const tweetRepo = new TweetRepository();
    const tweets = await tweetRepo.getAll(0, 2);
    const likeService = new LikeService(); 
    await likeService.toggleLike(tweets[0].id, 'Tweet', users[0].id);

})   