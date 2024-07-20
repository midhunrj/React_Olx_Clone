import React, { Fragment,useState,useContext} from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext,AuthContext } from '../../store/firebaseContext';

const Create = () => {
  const date=new Date()
  const {firebase}=useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState('')
  const[nameError,setNameError]=useState('')
  const[categoryError,setCategoryError]=useState('')
  const[priceError,setPriceError]=useState('')
  const[imageError,setImageError]=useState('')
  const navigate=useNavigate()
  const  validateImage=(file)=>{
    if(!file)
    {
      setImageError('please Select an image File')
      setImage(null)
      return false
    }
    else if(!file.type.startsWith('image/'))
    {
      setImageError('please select an valid image file')
      setImage(null)
      return false
    }
    else{
      return true
    }
   }
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(name=="")
    {
      setNameError('name cannot be empty')
     // return
    }
    if(category=="")
    {
      setCategoryError('category cannot be empty')
     // return
    }
    if(price=="")
    {
      setPriceError('price cannot be empty')
      //return
    }
    else if(isNaN(price)||price<=0)
    {
      setPriceError('Enter a valid positive number in price field')
      return
    }
    if(image=="")
    {
      setImageError('image cannot be empty')
      return
    }
    // else{
    //   const file=e.target.files[0]
    //   validateImage(file)
    // }
   if(name&&price&&category&&image &&validateImage(image))
   {
    
    firebase.storage().ref(`/image/${image.name}`).put(image)
    .then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
       console.log(url,"jhj");
       firebase.firestore().collection('products').add({
        name,
        category,
        price,
        url,
        userId:user.uid,
        createdAt:date.toLocaleDateString()
       }) 
       navigate('/')
      })
    })
  }

  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              
              onChange={(e)=>{
                setNameError('')
              setName(e.target.value)}}
            />
            <br/>
            <span className="error">{nameError}</span>
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>{
                setCategoryError('')
              setCategory(e.target.value)}}
            />
            <br/>
            <span className="error">{categoryError}</span>
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={price}
            onChange={(e)=>{
              setPriceError('')
              setPrice(e.target.value)}} />
            <br />
            <span className="error">{priceError}</span>
            <br/>
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):""}></img>
          <form>
            <br />
            <input onChange={(e)=>{
              setImageError('')
              setImage(e.target.files[0])}} type="file" />
            <br />
            <span className="error">{setImageError}</span>
            <br/>
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
