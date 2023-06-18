import TweetService from "../services/tweet-service.js";
import User from "../models/user.js";
import Tweet from "../models/tweet.js";
const tweetService = new TweetService();

export const createTweet = async (req, res) => {
    try {
        const response = await tweetService.create(req.body);
        res.status(201).json({
            success: true,
            message: 'successfully created a Tweet',
            data: response,
            err: {}
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        })
    }
}

export const getTweet = async (req, res) => {
    try {
        const response = await tweetService.get(req.params.id);
        res.status(200).json({
            success: true,
            message: 'successfully fetched a Tweet',
            data: response,
            err: {}
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        })
    }
}

export const getTimeline = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.id);
        const userTweets = await Tweet.find({ userId: currentUser._id });
        const followingTweets = await Promise.all(
            currentUser.following.map((followingId) => {
                return Tweet.find({ userId: followingId });
            })
        )
        res.status(200).json(userTweets.concat(...followingTweets));

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        })


    }

}

export const getUserTweets = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.id);
        const userTweets = await Tweet.find({ userId: currentUser._id }).sort({
            createdAt: -1
        });
        res.status(200).json(userTweets);

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        })
    }
}

export const getExploreTweets = async (req, res) => {
    try {
        const tweets = await Tweet.find({
            likes : {
                $exists : true
            }
        }).sort({
            likes : -1
        });
        res.status(200).json(tweets);

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        })
    }
}

export const likeOrDislike = async (req, res) => {
    try {
      const tweet = await Tweet.findById(req.params.id);
      if (!tweet.likes.includes(req.body.id)) {
        await tweet.updateOne({ $push: { likes: req.body.id } });
        res.status(200).json("tweet has been liked");
      } else {
        await tweet.updateOne({ $pull: { likes: req.body.id } });
        res.status(200).json("tweet has been disliked");
      }
    } catch (err) {
    //   handleError(500, err);
    console.log(error)
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        })
    }
  };