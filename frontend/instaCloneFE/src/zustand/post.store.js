import {create} from 'zustand'

import { getFeed, createPost,likePost,unlikePost,savePost,getFollower,getFollowing} from "./post.api";

export const usePostStore= create((set,get)=>({
    // Firstly all the state variables

    feed:[],followers:[],following:[],savedPosts:[],loading:false,



    // now all the functions that change these state variables using the api functions in post.api.js



    //LOADING FEED

    loadFeed:async()=>{
        set({loading:true})
        const data= await getFeed()
        // calls GET feed API which calls getFeedController, this returns res.json({posts})
        set({feed:data.posts, loading:false})
    },



    // CREATING POSTS

    createPost:async(imageFile,caption)=>{
        set({loading:true})
        const data= await createPost(imageFile,caption)
        
        const currentFeed=get().feed
        set({feed:[data.post,...currentFeed], loading:false})
    },


    
    // LIKING A POST

    likePost:async(postId)=>{
        
        await likePost(postId)
        get().loadFeed() // reloads the feed after like


    },


    //UNLIKING A POST

    unlikePost:async(postId)=>{
        await unlikePost(postId)
        get().loadFeed()
    },


    //SAVE POST

    savePost:async(postId)=>{
        await savePost(postId)
        const currentSaved=get().savedPosts

        set({savedPosts:[currentSaved,...savedPosts]})
    },


    // LOAD FOLLOWERS

    loadFollower:async()=>{
        const data= await getFollowers()

        set({followers:data.followers})

    },


    //LOAD FOLLOWING

    loadFollowing:async()=>{
        const data=await getFollowing()

        set({following:data.following})
    }

}))
