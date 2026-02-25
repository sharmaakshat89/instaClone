// AUTH API Layer: auth.api.js

import axios from 'axios'

const api=axios.create({
    baseURL:'http://localhost:3000/api/auth',

    withCredentials:true
})
//backend route:router.post('/login', loginController)


async function login(username,password){

    const response = await api.post('/login', {
        username:username,
        password:password
    })//finds user in db and stores in response

    return response.data
    
//in backend 
//loginController(req,res){const{username,password}
// = req.body   coming from login fnc above
//const user=await checkUserInDatabase(username, password)
//res.json({user}) this is sent as response.data in login fnc

//api.post('/login',{username,password})---sends data to-->
// const {username,password}=req.body
}



//AUTH CONTEXT Layer auth.context.js

import { createContext,useState } from 'react'

const AuthContext=createContext()

const AuthProvider=({children})=>{
    const[user,setUser]=useState(null)
    const [loading,setLoading]=useState(false)

    return(
        <AuthContext.Provider value={{
            user,setUser,loading,setLoading
        }} >
        {children}
        </ AuthContext.Provider>

//ur custom hook will call setUser 
// when data from backend comes
//and store res.json({user}) in user
    )
}



//HOOK Layer useAuth.js

import { useContext } from 'react'
// import AuthContext from above
//import login from above

const{user,setUser,loading,setLoading}=useContext(AuthContext)

const handleLogin=async (username,password)=>{

    setLoading(true)

    const data=await login(username,password)

//LOGIN.JSX ---> handleLogin  (sends usn and pswd)
//handleLogin ---> login func  (sends usn and pswd)
//login--->const{ username, password }=req.body @backend
// const{ username, password }=req.body @backend--->controller
//controller --->data --->setUser (resp in form of user obj)

    setUser(data.user)

    setLoading(false)

// get user via usecontext that was made above
// the parameters passed in handle login  ; username&pswd
//will be sent to login func
//they will give a resp which is stored in data
//that data is stored in user

//FLOW-->login(usn,pswd)  API LAYER-->data-->user CONTEXT LAYER



return {loading,user,handleLogin}
}

//UI Layer Login.jsx

//import useState
//import useAuth
const Login= ()=>{

    const{handleLogin,loading}=useAuth()
    const [username,setUsername]=useState('')
    const[password,setPassword]=useState('')

    const handleSubmit=async(e)=>{
        e.preventDefault()

        await handleLogin(username,password)
    }

    // form onsubmit=handlesubmit
    // //setUsn/setPswd funcs onchange on both inputs
    // btn will show loggin in or login 
    // {loading ? "Logging in..." : "Login"}
    //depending upon state of loading


}



//LOGIN.JSX ---> handleLogin  (sends usn and pswd)
//handleLogin ---> login func  (sends usn and pswd)
//login--->const{ username, password }=req.body @backend
// const{ username, password }=req.body @backend--->controller
//controller --->data --->setUser (resp in form of user obj)
