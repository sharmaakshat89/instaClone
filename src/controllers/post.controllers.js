
const postModel=require('../models/post.model')
const imageKit=require('@imagekit/nodejs')
const {toFile}=require('@imagekit/nodejs')
const jwt=require('jsonwebtoken')

const imagekit=new imageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})




async function createPostController(req,res){
    const token=req.cookies.token
    if(!token){
      return res.status(401).json({message:'Unauthorised : token not found'})

      try{
         const decoded= jwt.verify(token,process.env.JWT_SECRET) // to check if token is created using ur jwt_secret
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
   user:decoded.id

})

res.status(201).json({
   message:'post created successfully',
   post
})

}

module.exports={createPostController}


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
