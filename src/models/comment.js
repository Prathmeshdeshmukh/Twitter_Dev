import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Tweet', 'Comment']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    commentable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    comments :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment; 