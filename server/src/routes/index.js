import express from 'express';
import { createTweet, getTweet, getTimeline, getUserTweets,likeOrDislike, getExploreTweets} from '../controllers/tweet-controller.js';
import { toggleLike } from '../controllers/like-controller.js';
import { createComment } from '../controllers/comment-controller.js';
import { authenticate } from '../midllewares/authenticate.js';
import { signUp , getUser , login, updateUser, deleteUser, followUser, unFollowUser } from '../controllers/user-controller.js';
const router = express.Router();

//User CRUD routes
router.post('/signup', signUp );
router.post('/login', login);
router.get('/user/find/:id', getUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);

//tweets CRUD
router.post('/tweets',  createTweet);
router.get('/tweets/:id', getTweet );
router.get('/timeline/:id', getTimeline);
router.get('/tweets/all/:id', getUserTweets);
router.get('/explore', getExploreTweets);
//likes Routes
router.post('/likes/toggle', toggleLike);
router.put('/tweets/:id/like', likeOrDislike);
//comments Route
router.post('/comments', authenticate, createComment);

//Follower & Following routes
router.put('/users/follow/:id', followUser);
router.put('/users/unFollow/:id', unFollowUser);

export default router;