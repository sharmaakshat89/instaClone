const express=require('express')

const postRouter=express.Router()

const postController=require('../controllers/post.controller')

const upload=require('../middlewares/upload')



postRouter.post('/',upload.single('image' ) ,postController.createPostController)
// upload.single('image')----> whatever is the name of key in which the pic is uploaded in the form @frontend is used here
module.exports=postRouter