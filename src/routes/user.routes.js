const userController=require("../controllers/user.controller")
const identifyUser=require("../middlewares/identifyUser")

const express=require("express")

const userRouter=express.Router()

userRouter.post("/follow/:username",identifyUser,userController.followUserController)

userRouter.post("/unfollow/:username",identifyUser,userController.unfollowUserController)

module.exports=userRouter