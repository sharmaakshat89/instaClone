import { createContext,useState } from "react";
// this is the state layer, stores our data

export const AuthContext=createContext()
//context created here

export const AuthProvider=({children})=>{

    const [user , setUser] = useState(null)
    const [loading , setLoading] = useState(null)


    return (
        <AuthContext.Provider value={{user, setUser, loading , setLoading}} >
            {children}
        </AuthContext.Provider>
    )
}