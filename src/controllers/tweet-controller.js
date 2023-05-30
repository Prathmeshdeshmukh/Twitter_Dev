import TweetService  from "../services/tweet-service.js";
const tweetService = new TweetService();

export const createTweet = async(req, res)=>{
    try {
        const response = await tweetService.create(req.body);
        res.status(201).json({
            success: true,
            message : 'successfully created a Tweet',
            data: response,
            err :{}
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : 'something went wrong',
            data: {},
            err :error
        })
    }
}

