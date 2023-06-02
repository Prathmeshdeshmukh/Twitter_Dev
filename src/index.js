import express from 'express'
import bodyParser from 'body-parser';
import connect from './config/database-config.js';
import router from './routes/index.js';
import { LikeRepository, TweetRepository, UserRepository, CommentRepository } from './repository/index.js';
import LikeService from './services/like-service.js';

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api', router);
app.listen(PORT, async () => {


    console.log('connected to PORT', PORT);
    await connect();
    console.log("mongodb connected");
    // const userRepo = new UserRepository();
    // const user = await userRepo.create({
    //     username: "sankey",
    //     email: "abc@123",
    //     password : "nahipata"
    // })
    // console.log(user);

    // const commentRepo = new CommentRepository();
    // const comment = await commentRepo.create({
    //     user: "6478b18b35493da607e8ac95",
    //     onModel: "Tweet",
    //     commentable: "64776460caa877c685a6bba3",
    //     comments: [],
    //     content: "first comment",
    // })
    // console.log(comment) 

})   