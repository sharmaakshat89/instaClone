const express=require('express')

const postRouter=express.Router()

const postController=require('../controllers/post.controllers')
const identifyUser= require('../middlewares/identifyUser')
const upload=require('../middlewares/upload')



postRouter.get('/',identifyUser,postController.getPostController)

postRouter.get('/details/:postid', identifyUser,postController.getPostDetailsController)  // returns details about a specific post that has the id suffixed in the url, also check whether the post belongs to the user who used this api endpoint

postRouter.post('/',upload.single('image' ), identifyUser ,postController.createPostController)
// upload.single('image')----> whatever is the name of key in which the pic is uploaded in the form @frontend is used here

postRouter.post("/like/:postId", identifyUser , postController.likePostController)


module.exports=postRouter   