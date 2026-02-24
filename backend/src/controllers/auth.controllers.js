const userModel=require('../models/user.model')

const crypto=require('crypto')

const jwt=require('jsonwebtoken')

const bcrypt=require('bcryptjs')


async function registerController(req,res){

    const {username,email,password,bio,profImg}=req.body

    const doesUserExist=await userModel.findOne({
        $or:[{username},{email}]
    })

    if(doesUserExist){
        return res.status(409).json({
            message:"user already exists"
        })
    }

    //const hash=crypto.createHash('sha256').update(password).digest('hex')
//better method is bcrypt that reqs await --->
    const hash=await bcrypt.hash(password,10)// 10 is the salt, i.e the no of times u wish to do hashing

    const user=await userModel.create({
        username, email , password:hash , bio,profImg
    })

    const token=jwt.sign({id:user._id, username:user.username},process.env.JWT_SECRET, {expiresIn:"1d"})

    res.cookie('token', token)

    res.status(201).json({
        message:'user registered successfully',
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profImg:user.profImg

        }
    })

}





async function loginController(req,res){

    const {username,email,password}=req.body

    const user= await userModel.findOne({
        $or:[{username},{email}]
    }).select('+password') //this forces the query to read the password that has not been permitted by the model

    if(!user){
        return res.status(404).json({
            message:`no user found with ${username} ${email}`
        })
    }

    // const hash=crypto.createHash('sha256').update(password).digest('hex')
    // const isPswdValid = user.password===hash

// here also using bcrypt instead of crypto--->
    
    const isPswdValid=await bcrypt.compare(password,user.password)
//does both hashing and comparison of user entered pswd


    if(!isPswdValid){
        return res.status(401).json({
            message:"password is invalid"
        })
    }

    const token=jwt.sign(
        {id:user._id, username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"})


    res.cookie('token',token)
    
    res.status(200).json({
        message:"user logged in succcessfully",
        user:{
            username:user.username,
            email:user.email
        }
    })

}



module.exports={
    registerController,
    loginController
}