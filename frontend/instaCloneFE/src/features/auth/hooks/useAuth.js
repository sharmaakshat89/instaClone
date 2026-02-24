import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {login,register} from '../services/auth.api'

// this being the HOOK layer, it manages both the api and the context

export const useAuth = () =>{

    const context=useContext(AuthContext) // getting the context we created in auth.context.js

    const {user, setUser , loading , setLoading} = context // getting them in destruc obj form

    const handleLogin = async (username, password)=>{
        setLoading(true)
        const response = await login(username , password)

        setUser(response.user)

        setLoading(false)
    }

    // both these funcs are managing and calling APIs and state managers
    
    const handleRegister = async (username, email,password)=>{
        setLoading(true)
        const response = await register(username,email , password)

        setUser(response.user)

        setLoading(false)
    }

    return {
        user, loading ,handleLogin , handleRegister
    }

}