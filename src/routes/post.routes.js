const express=require('express')

const postRouter=express.Router()

const postController=require('../controllers/post.controllers')

const upload=require('../middlewares/upload')



postRouter.get('/',postController.getPostController)

postRouter.get('/details/:postid', postController.getPostDetailsController)  // returns details about a specific post that has the id suffixed in the url, also check whether the post belongs to the user who used this api endpoint

postRouter.post('/',upload.single('image' ) ,postController.createPostController)
// upload.single('image')----> whatever is the name of key in which the pic is uploaded in the form @frontend is used here



module.exports=postRouter   