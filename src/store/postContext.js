import {createContext,useState} from 'react'

export const postContext=createContext(null)

export const Post=({children})=>{
    const [postDetails,setPostDetails]=useState("")
    return(
        <postContext.Provider value={{postDetails,setPostDetails}}>
          {children}
        </postContext.Provider>
    )
}
//export default Post