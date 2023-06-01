import LikeService from "../services/like-service.js";

const likeService = new LikeService();

export const toggleLike = async(req, res) =>{
    try {
        const response = await likeService.toggleLike(req.query.modelId, req.query.modelType, req.body.userId);
        console.log(response)
        return res.status(200).json({
            success: true,
            message : 'successfully done task',
            data: response,
            err :{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message : 'something went wrong',
            data: {},
            err :error
        })
    }
}