import Tweet from '../models/tweet.js'

class TweetRepository {
    async create(data) {
        try {
            const tweet = await Tweet.create(data);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async get(id) {
        try {
            const tweet = await Tweet.findById(id);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async getwithComment(id) {
        try {
            const tweet = await Tweet.findById(id).populate({path:'comments'});
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }
    async destroy(id) {
        try {
            const tweet = await Tweet.findByIdAndRemove(id);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = TweetRepository;