import React,{createContext,useState} from 'react'
export const Authcontext=createContext()

export const AuthProvider=({children})=>{
    const[isAuthenticated,setIsAuthenticated]=useState('false')

    const login=()=>{
        setIsAuthenticated(true)
    }
    const logout=()=>{
        setIsAuthenticated(false)
    }

    return(
        <Authcontext.Provider value={{isAuthenticated,login,logout}}>
            {children}
        </Authcontext.Provider>
    )
}

