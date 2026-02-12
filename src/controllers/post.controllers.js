
const postModel=require('../models/post.model')
const imageKit=require('@imagekit/nodejs')
const {toFile}=require('@imagekit/nodejs')


const imagekit=new imageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){

    const file=await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"Test"
    })

    res.send(file)

}

module.exports={createPostController}


/*
IMAGE UPLOAD FLOW (IMPORTANT NOTES)

1) Multer gives image as buffer → req.file.buffer (raw image data)

2) toFile(buffer, 'file'):
   - Converts buffer into a file-like object
   - 'file' here is ONLY a temporary label (not real filename)
   - It has NO relation with const file below

3) What is sent to ImageKit?
   - Output of toFile() is sent
   - NOT const file
   - NOT the string 'file'

4) imagekit.files.upload():
   - Uploads converted file to ImageKit cloud
   - Returns a response object

5) const file:
   - This is the RESPONSE from ImageKit
   - It is an object (metadata only)
   - Contains: URL, id, name, size, etc.
   - Does NOT contain actual image (.jpg/.png data)

6) fileName: "Test":
   - This is the name used to store image on ImageKit
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
