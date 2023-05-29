const { TweetRepository , HashtagRepository } = require('../repository/index')

class TweetService{
    constructor(){
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data){
        const content = data.content;
        var  tags = content.match(/#[a-zA-Z0-9_]+/g);
        tags = tags.map((tag) => tag.substring(1));
        // console.log(tags);

        const tweet = await this.tweetRepository.create(data);
        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
        let titleOfPresenttags = alreadyPresentTags.map(tags => tags.title);
        
        let newTags = tags.filter(tag => !titleOfPresenttags.includes(tag));
        console.log(newTags);
        newTags = newTags.map(tag => {
            return { title : tag, tweets : [tweet.id]}
        });
         const response = await this.hashtagRepository.bulkCreate(newTags);
        console.log(response);
        return tweet;
    }
}

module.exports = TweetService;