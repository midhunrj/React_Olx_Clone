import React ,{useState,useContext} from 'react';
import { FirebaseContext } from '../../store/firebaseContext';
import Logo from '../../olx-logo.png';
import './Signup.css';
//import { Firebase } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
export default function Signup() {
  const navigate=useNavigate()
  const [username,setUsername]=useState('')
  const [mobile,setMobile]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [usernameError,setUsernameError]=useState('')
  const [mobileError,setMobileError]=useState('')
  const [emailError,setEmailError]=useState('')
  const [passwordError,setPasswordError]=useState('')
  const [error,setError]=useState('')
  const {firebase}=useContext(FirebaseContext)
  const validateMobile=(mobile)=>{
    mobile=mobile.toString()
    const regex=/^\d{10}$/;
    return regex.test(mobile)
   }
   const validateEmail=(email)=>{
    const regex=/^[^\s@]+@[^\s@]+\.[6\s@]+$/;
    return regex.test(email)
  }
  // const handleSubmit=(e)=>{
  //   e.preventDefault()
  //   firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
  //     result.user.updateProfile({displayName:username}).then(()=>
  //     firebase.firestore().collection('users').add({id:result.user.uid,
  //     username:username,
  //   phone:mobile}).then(()=>{history.push('/login')}))
  //   })
  // console.log("Signup page username", username);
  // console.log("Signup page console",firebase);
  // }


  const handleSubmit = (e) => {
    e.preventDefault();
    if(username=="")
    {
      setUsernameError("username field is Empty")
      return;
    }
    if(email=="")
    {
      setEmailError("email field is empty")
      return;
    }
    if(mobile=="")
    {
      setMobileError("mobile field is empty")
      return;
    }
    if(password=="")
    {
      setPasswordError("password field is empty")
      return;
    }
    
    if (!firebase) {
      console.error('Firebase is not initialized.');
      return;
    }

    

    
    const validatePassword=(password)=>{
      const regex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
      return regex.test(password)
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        return result.user.updateProfile({ displayName: username }).then(() => {
          return firebase.firestore().collection('users').add({
            id: result.user.uid,
            username: username,
            phone: mobile
          });
        });
      })
      .then(() => {
        navigate('/login')
      })
      .catch((error) => {
        setError(error.message)
        console.error('Error signing up:', error);
      });
  };
  
   return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img><br/>
        {error &&<p className='error'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e)=>{
              setUsernameError('') 
              setUsername(e.target.value)}}
          />
          <br/>
          <span className='error'>{usernameError}</span>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>{
              setEmailError('')
              setEmail(e.target.value)
           //setEmailError(validateEmail(e.target.value)?'':"invalid email")
             var kk=validateEmail(e.target.value)?'':"invalid email"
             setEmailError(kk)
            }}
              
          />
          <br/>
          <span className='error'>{emailError}</span>
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="tel"
            id="lname"
            name="phone"
            value={mobile}
            onChange={(e)=>{
              setMobileError('')
              setMobile(e.target.value)
          let jk=validateMobile(e.target.value)?"":"Invalid mobile number"
          setMobileError(jk)
          }}
          />
          <br/>
          <span className='error'>{mobileError}</span>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>{
              setPasswordError('')
              setPassword(e.target.value)
            //setPasswordError(validatePassword(e.target.value)?"":"password should be stronger min 8 charcter having atleast 1 letter and 1 number")
          }}
          />
          <br/>
          <span className='error'>{passwordError}</span>
          <br />
          <br />
          <button onClick={()=>navigate('/signup')}>Signup</button>
        </form>
        <a onClick={()=>navigate('/login')}>Login</a>
      </div>
    </div>
  );
}
