const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:''
    },
    imgUrl:{
        type:String,
        required:[true,'img url is required ']
    },
    user:{
        ref:'users', 
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'user id is required']
    }
    // ObjectId = stores MongoDB document ID, the type here is not string but a special type called objectid
    // ref = tells which collection this ID belongs to (for populate)
    // Together = link between posts and users

})




const postModel=mongoose.model('posts',postSchema)


module.exports=postModel