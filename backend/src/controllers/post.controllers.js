
const postModel=require('../models/post.model')
const imageKit=require('@imagekit/nodejs')
const {toFile}=require('@imagekit/nodejs')
const jwt=require('jsonwebtoken')
const likeModel=require("../models/like.model")

const imagekit=new imageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})




async function createPostController(req,res){

   
/*
IMAGE UPLOAD FLOW (IMPORTANT NOTES)

1) Multer gives image as buffer → req.file.buffer (raw image data)

2) toFile(buffer, 'file'):
   - Converts buffer into file-like obj
   - 'file'--> ONLY a temporary label (not real)
   - It has NO relation with const file 

3) What is sent to ImageKit?
   - Output of toFile() sent to imagekit
   

4) imagekit.files.upload():
   - Uploads converted file to ImageKit cloud
   - Returns a response object

5) const file:
   - IMAGEKIT RESP 
   - It is an object
   - Contains: URL, id, name, size not the img file
   

6) fileName: "Test":
   - name used to store image on ImageKit
   - Better: req.file.originalname (keeps real filename)
   - Best: Date.now() + originalname (avoids clashes)

7) Where is real image stored?
   - On ImageKit server (cloud)
   - Accessed using file.url
   - Not stored in Node.js or MongoDB

8) Buffer.from():
   - req.file.buffer is already a buffer
   - Buffer.from is extra safety (not wrong, just redundant)

9) Final Flow:
   buffer → toFile → upload → response object → res.send()

REMEMBER:
'file' (string) = temp label
fileName = cloud filename
const file = upload result
*/


    const token=req.cookies.token
    if(!token){
      return res.status(401).json({message:'Unauthorised : token not found'})
      let decoded= null

      try{
          decoded= jwt.verify(token,process.env.JWT_SECRET) // to check if token is created using ur jwt_secret
      }catch(err){
         return res.status(401).json({message:"Unauthorised: invalid token"})
      }

    }
    const file=await imagekit.files.upload({       //Uploads converted file to ImageKit cloud , which returns a resp obj named file
        file:await toFile(                        //Converts buffer into file-like obj
         Buffer.from(req.file.buffer),'file'      //
      ),
        fileName:"Test"
    })

const post=await postModel.create({
   caption:req.body.caption,
   ImgUrl:file.url,
   user:req.user.id

})

res.status(201).json({
   message:'post created successfully',
   post
})

}




async function getPostController(req,res){
   

   // 1. getting user id from decoded
   const userId=req.user.id

   // 2. get all the posts which have (inside their schema) the users value of userId
   const posts=await postModel.find({
      user:userId
   })
   
   // 3. sending res as 200 and the posts along with it
   res.status(200).json({
      message:"Posts fetched successfully.",
      posts
   })


}

async function getPostDetailsController(req,res){

   // 1. getting user id from decoded i.e req.user and post id from the req params 
   const userId=req.user.id
   const postId=req.params.postId

   // 2. getting the post with the id from postmodel collection 
   const post=await postModel.findById(postId)

   // 3. if post not found send 404 resp
   if (!post) {
      return res.status(404).json({
         message:"post not found"
      })
   }

   // 4. checking if user requesting the post is looking at his own post
   const isUserValid= post.user.toString()=== userId
   // .toString() => to conv an obj id (as post.user returns an obj id) to string , as userId is already a string

   // 5. if not then sending 403 resp
   if(!isUserValid){
      return res.status(403).json({
         message:"Forbidden Content"
      })
   }

   // 6. if all checks passed then sending resp 200 and the post
   res.status(200).json({
      message:"Post fetched successfully",
      post
   })

}

async function likePostController(req,res){
   const username=req.user.username
   const postId=req.params.postId

   const post=await postModel.findOne({
      post:postId
   })

   if(!post){
      return res.status(404).json({
         message:"the selected post doesnt exist"
      })
   }
   const like=await likeModel.create({
      user:username,post:postId
   })

   return res.status(200).json({
      message:"Post liked successfully"
   })

}

module.exports={
   createPostController,
   getPostController,
   getPostDetailsController,
   likePostController

}

