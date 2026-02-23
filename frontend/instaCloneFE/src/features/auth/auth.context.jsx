import { createContext,useState } from "react";
// this is the state layer, stores our data

export const authContext=createContext()
//context created here

export const authProvider=({children})=>{

    const [user , setUser] = useState(null)
    const [loading , setLoading] = useState(null)


    return (
        <authContext.Provider value={{user, setUser, loading , setLoading}} >
            {children}
        </authContext.Provider>
    )
}