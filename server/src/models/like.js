import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    likable :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        refPath : 'onModel'
    },
    onModel:{
        type: String,
        required: true,
        enum :['Tweet', 'Comment']
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

const Like = mongoose.model('Like', LikeSchema);

export default Like;