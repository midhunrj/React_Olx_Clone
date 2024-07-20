import React,{createContext,useState} from 'react'
import firebase from '../firebase/config'

export const FirebaseContext=createContext(null)

export const AuthContext=createContext(null)

export const Context=({children})=>{
   const [user,setUser]=useState(null)
   return(
    <AuthContext.Provider value={{user,setUser}}>
        {children}
    </AuthContext.Provider>
   )
}
export const FirebaseProvider=({children})=>{
    return(
        <FirebaseContext.Provider value={{firebase}}>
            {children}
        </FirebaseContext.Provider>
    )
}