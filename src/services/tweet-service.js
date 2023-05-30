import { TweetRepository , HashtagRepository} from '../repository/index.js';

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        const content = data.content;
        var tags = content.match(/#[a-zA-Z0-9_]+/g);
        tags = tags.map((tag) => tag.substring(1)).map((tag)=> tag.toLowerCase());

        const tweet = await this.tweetRepository.create(data);
        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
        //updating tweets id in old hashtags
        alreadyPresentTags.map((tag) => {
            tag.tweets.push(tweet.id);
            tag.save();
        })


        let titleOfPresenttags = alreadyPresentTags.map(tags => tags.title);

        //finding new tags by comapring all old tags
        let newTags = tags.filter(tag => !titleOfPresenttags.includes(tag));
        newTags = newTags.map(tag => {
            return { title: tag, tweets: [tweet.id] }
        });
        //creating hashtags that are new 
        await this.hashtagRepository.bulkCreate(newTags);
        // await tweet.hashtags.push()
        return tweet;
    }
}

export default TweetService;