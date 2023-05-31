import mongoose, { mongo } from "mongoose";

const tweetSchema = new mongoose.Schema({
    content : {
        type: String,
        required : true,
        max : [250, 'tweet cannot exceed 250 characters']
    },
    likes : [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Like'
    }
]
},{
    timestamps: true
}); 



const Tweet = mongoose.model('Tweet', tweetSchema);
export default Tweet; 