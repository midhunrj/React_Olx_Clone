import React,{useEffect,useState,useContext} from 'react';

import './View.css';
import { postContext } from '../../store/postContext';
import { FirebaseContext } from '../../store/firebaseContext';
function View() {
  const[userDetails,setUserDetails]=useState("")
  const {postDetails}=useContext(postContext)
  const {firebase}=useContext(FirebaseContext)
  useEffect(()=>{
   const{userId}= postDetails
firebase.firestore().collection('users').where('id','==',userId)
.get().then((res)=>{
  res.forEach((elem)=>{
     setUserDetails(elem.data())
  })
})
  },[])

  // if(!postDetails)
  //   {
  //     return <div>Loading ...</div>
  //   }
  return (
    
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        {postDetails &&
        <img
        src={postDetails.url}
        alt={postDetails.name}
      />
        }
        
      </div>
      <div className="rightSection">
      {postDetails &&
      <>
      
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.mobile}</p>
        </div>
        </>
}
      </div>
    </div>
  );
}
export default View;
