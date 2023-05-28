const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content : {
        type: String,
        required : true,
        max : [250, 'tweet cannot exceed 250 characters']
    },
    hashtags : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Hashtag'
    }
},{
    timestamps: true
}); 

tweetSchema.virtual('contentWithEmail').get(function process(){
    return `${this.content} is created by ${this.userEmail}`;
})

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet; 