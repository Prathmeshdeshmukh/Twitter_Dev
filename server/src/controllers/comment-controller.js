import CommentService  from "../services/comment-service.js";
const commentService = new CommentService();

export const createComment = async(req, res)=>{
    try {
        const response = await commentService.create(req.query.modelId, req.query.modelType, req.user.id, req.body.content );
        res.status(201).json({
            success: true,
            message : 'successfully created a Comment',
            data: response,
            err :{}
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message : 'something went wrong',
            data: {},
            err :error
        })
    }
}


