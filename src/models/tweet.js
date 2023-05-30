import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    content : {
        type: String,
        required : true,
        max : [250, 'tweet cannot exceed 250 characters']
    },
},{
    timestamps: true
}); 



const Tweet = mongoose.model('Tweet', tweetSchema);
export default Tweet; 