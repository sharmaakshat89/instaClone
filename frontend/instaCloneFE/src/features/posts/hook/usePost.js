import { PostContext } from "../post.context";
import { getFeed } from "../services/post.api";
import { useContext } from "react";


export const usePost = ()=>{

    const context= useContext(PostContext)

        
    const {loading , setLoading,post , setPost,feed,setFeed} = context

    const handleGetFeed = async () =>{
        setLoading(true)
        const data= await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }

    return {loading ,handleGetFeed,post,feed}

}
    
