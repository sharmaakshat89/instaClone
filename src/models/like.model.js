const mongoose=require('mongoose') //also an edge collection


const likeSchema=new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'posts',
        required:[true, 'post id of the post is required']
    },
    user:{
        type:String,
        required:[true, 'user of the post being liked is required']
    }
},{timestamps:true})

likeSchema.index({post:1,user:1},{unique:true})

const likeModel=mongoose.model('likes',likeSchema)

module.exports=likeModel