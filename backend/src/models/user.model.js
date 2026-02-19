const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        unique:[true, 'username already exists'],
        required:[true,'username is mandatory']
    },
    email:{
        type:String,
        unique:[true, 'email already exists'],
        required:[true, 'email is mandatory']
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String
    },
    profImg:{
        type:String
        ,default:'https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg'
    }
})

const userModel=mongoose.model("users", userSchema)

module.exports=userModel