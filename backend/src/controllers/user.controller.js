const followModel=require('../models/follow.model')
const userModel=require('../models/user.model')

async function followUserController(req,res){
    //1. getting the usernames of the users who will follow and be followed
    const followerUsername=req.user.followerUsername
    const followeeUsername=req.params.followeeUsername

// 2. checking the user is trying to follow themselves
    if(followeeUsername==followerUsername){
        return res.status(400).json({
            message:'User cannot follow themselves'
        })
    }

// 3. checking if the user being followed exists

const doesFolloweeExist= await userModel.findOne({
    username:followeeUsername
})

if(!doesFolloweeExist){
    return res.status(404).json({
        message:"the user u are trying to follow doesnt exist"
    })
}


//4. checking if the user already follows the given user
const isAlreadyFollowed=await followModel.findOne({
    follower:followeeUsername,
    followee:followeeUsername
})

if(isAlreadyFollowed){
    return res.status(200).json({
        message:"user is already followed by you"
    })
}

// 5. if all checks passed , adding the follow record to our follows edge collection using followModel
const followRecord=await followModel.create({
    follower:followerUsername,
    followee:followeeUsername
})

res.status(201).json({
    message:"User successfully followed"
})


}

async function unfollowUserController(req,res){
    //1. getting the usernames of the users who will follow and be followed
    const followerUsername=req.user.followerUsername
    const followeeUsername=req.params.followeeUsername


    

//2. checking if the user follows the given user
const isAlreadyFollowed=await followModel.findOne({
    follower:followeeUsername,
    followee:followeeUsername
})

if(!isAlreadyFollowed){
    return res.status(200).json({
        message:`user cannot unfollow ${followeeUsername}`
    })
}

// 3. deleting the record of the follow using the id we found in isAlreadyFollowed

await followModel.findByIdAndDelete([
    isAlreadyFollowed._id
])

return res.status(200).json({message:`you have unfollowed %{}`})



}


module.exports={followUserController,unfollowUserController}