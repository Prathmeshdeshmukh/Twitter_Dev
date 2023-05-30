const { TweetRepository, HashtagRepository } = require('../repository/index')

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        const content = data.content;
        var tags = content.match(/#[a-zA-Z0-9_]+/g);
        tags = tags.map((tag) => tag.substring(1));

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
        console.log(newTags);
        newTags = newTags.map(tag => {
            return { title: tag, tweets: [tweet.id] }
        });
        //creating hashtags that are new 
        await this.hashtagRepository.bulkCreate(newTags);

        return tweet;
    }
}

module.exports = TweetService;