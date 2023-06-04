import express from 'express';
import { createTweet, getTweet} from '../controllers/tweet-controller.js';
import { toggleLike } from '../controllers/like-controller.js';
import { createComment } from '../controllers/comment-controller.js';
import { authenticate } from '../midllewares/authenticate.js';
import { signUp , getUser , login } from '../controllers/user-controller.js';
const router = express.Router();

router.post('/user', signUp );
router.get('/user/:id', getUser);
router.post('/user/login', login);

router.post('/tweets', authenticate,  createTweet);
router.get('/tweets/:id', getTweet );

router.post('/likes/toggle', toggleLike);

router.post('/comments', authenticate, createComment);
export default router;