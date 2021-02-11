const express = require('express');
const {getPosts,createPost,postsByUser,postById,isPoster,deletePost,updatePost} = require('../controllers/post');
const {requireSignin} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const {createPostValidator} = require('../validator/index');
const { Router } = require('express');

const router = express.Router()

router.get('/posts',getPosts);
router.post("/post/new/:userId",requireSignin,createPost,createPostValidator);
router.get("/posts/by/:userId",requireSignin,postsByUser);
router.put('/post/:postId',requireSignin,isPoster,updatePost)
router.delete('/post/:postId',requireSignin,isPoster,deletePost);


// I f any route contains userId our app with exec userById
router.param("userId",userById);
router.param("postId",postById);

module.exports = router;