import { TweetRepository, HashtagRepository } from '../repository/index.js'

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        // console.log(data);
        const content = data.content;
        var tweet = await this.tweetRepository.create(data);
        // let tags = content.match(/#[a-zA-Z0-9_]+/g);
        // this regex extracts hashtags
        // if (tags) {
        //     tags = tags.map((tag) => tag.substring(1).toLowerCase());
           
        //     var alreadyPresentTags = await this.hashtagRepository.findByName(tags);
        //     let titleOfPresenttags = alreadyPresentTags.map(tags => tags.title);

        //     var newTags = tags.filter(tag => !titleOfPresenttags.includes(tag));
        //     newTags = newTags.map(tag => {
        //         return { title: tag, tweets: [tweet.id] }
        //     });
        //     await this.hashtagRepository.bulkCreate(newTags);
        //     alreadyPresentTags.forEach((tag) => {
        //         tag.tweets.push(tweet.id);
        //         tag.save();
        //     });
        // }
    return tweet;
    }

    async get(tweetId) {
        const tweet = await this.tweetRepository.getWithComments(tweetId);
        return tweet;
    }
}

export default TweetService;

/*
    this is my #first #tweet . I am really #excited
*/