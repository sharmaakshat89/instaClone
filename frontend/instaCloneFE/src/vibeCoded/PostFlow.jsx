// POST API Layer post.api.js

import axios from 'axios'

const api=axios.create({
    baseurl:'http://localhost:3000/api/posts',
    withCredentials:true
})

export async function getFeed(){

    const response=await api.get('/feed')

    return response.data

}

export async function createPost(imageFile,caption){
    const formData= new FormData()

    formData.append('image',imageFile)
    //'image' should match with---> upload.single('image')

    formData.append('caption',caption)

    const response=await api.post('/',formData)

    return response.data
}

export async function likePost(postId){
    const response=await api.post('/like'+postId)

    return response.data
//in backend: api/posts/like/:id 
//there req.params.id=postId

}

export async function unlikePost(postId){
    const response=api.post('/unlike'+postId)
    return response.data
}

//in backend post.routes.js
// router.get("/feed", getFeedController)
// router.post("/", upload.single("chacha"), createPostController)
// router.post("/like/:id", likeController)
// router.post("/unlike/:id", unLikeController)

//POST CONTEXT Layer post.context.jsx

import { createContext,useState } from 'react'

export const PostContext=createContext()

export const PostProvider=({children}) => {

    const [feed,setFeed]=useState([])
    const [loading,setLoading]=useState(false)

    return (
    <PostContext.Provider value={{feed,setFeed,loading,setLoading}}>
        {children}
        </PostContext.Provider>)
}



//HOOK Layer usePost.js

import{useContext} from 'react'
//import PostContext
//import getfeed,createpost,likepost,unlikepost from api func

const{feed,setFeed,loading,setLoading}=useContext(PostContext)

const handleGetFeed=async()=>{
    //u got feed from context layer
    //u got posts from api layer
    // now combine them in this layer

    setLoading(true)

    const data=await getFeed()
// in api api/posts/feed 
//getFeedController is called
//and it will send res.json({posts})
//this will get stored in data

    setFeed(data.posts)

    setLoading(false)
}

const handleCreatePost= async(imageFile,Caption)=>{
    setLoading(true)

    const data= await createPost(imageFile,caption)
    setFeed([data.post, ...feed])
    setLoading(false)
}

const handlelikePost=async(postId)=>{
    setLoading(true)
    await likePost(postid)
    await handleGetFeed()
    setLoading(false)
}


const handleUnlikePost=async(postId)=>{
    setLoading(true)
    await UnlikePost(postid)
    await handleGetFeed()
    setLoading(false)
}

return {
    feed,
    loading,
    handleGetFeed,
    handleCreatePost,
    handlelikePost,
    handleUnlikePost
}


//UI Layer Feed.jsx 

//import usePost
import { useEffect } from 'react'

const Feed=()=>{

const{feed,handlelikePost,handleUnlikePost}=usepost()

useEffect(()=>{
handleGetFeed()
},[])

return(
    <>
     {feed.map((post)=>{
        <div key={post.id}>
            <img src={post.image} alt="" />
            <p>{post.caption}</p>
            <button onClick={handlelikePost}>LIKE</button>
            <button onClick={handleUnlikePost}>UNLIKE</button>
        </div>

        })
    }
    </>
       
)
        
   
}



//CreatePost.JSX

//import usePost
//import usestate

const[image,setImage]=useState(null)
const {handlecreatePost}=usePost()
const[caption,setCaption]=useState('')

const handleSubmit=async(e)=>{
    e.preventDefault()

    await handlecreatePost(image,caption)
}

return(
    <form onSubmit={handleSubmit}>
        <input type="file" onChange={setImage(e.target.files[0])} name="" id="" />
        <input type="text" onChange={(e)=> setCaption(e.target.value)} name="" id="" />
    </form>
)