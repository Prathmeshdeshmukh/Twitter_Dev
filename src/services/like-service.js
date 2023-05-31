import { LikeRepository, TweetRepository } from "../repository/index.js";

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId, modelType, userId) {
        console.log(modelId, modelType, userId);
        if (modelType == 'Tweet') {
            var likable = await this.tweetRepository.find(modelId);

        }
        else if (modelType == 'Comment') {

        } else {
            throw new Error('unknown model type');
        }

        const exists = await this.likeRepository.findByUserAndLikable({
            user: userId,
            onModel: modelType,
            likable: modelId
        })
        console.log('exist', exists);
        if (exists) {
            likable.likes.pull(exists.id);
            await likable.save();
            await exists.deleteOne();
        }
        else {
            const newLike = await this.likeRepository.create({
                user: userId,
                onModel: modelType,
                likable: modelId
            })

            likable.likes.push(newLike);
            await likable.save();
        }
        return true;
    }
}

export default LikeService;