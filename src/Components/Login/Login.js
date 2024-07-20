import React,{useState,useContext} from 'react';
import { FirebaseContext } from '../../store/firebaseContext';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../../store/authcontext';
function Login() {
  const navigate=useNavigate()
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[emailError,setEmailError]=useState('')
  const[passwordError,setPasswordError]=useState('')
  const[error,setError]=useState('')
  const{login}=useContext(Authcontext)
  const {firebase}=useContext(FirebaseContext)
  const handleLogin=(e)=>{
    e.preventDefault()
    if(password=="")
    {
      setPasswordError('password cannot be empty')
      return
    }
    if(email=="")
    {
      setEmailError("email cannot be empty")
      return
    }
    const validateEmail=(email)=>{
      const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return regex.test(email)
    }
    const validatePassword=(password)=>{
      const regex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
      return regex.test(password)
    }
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(()=>{
      //alert('logged in')
      login()
      navigate('/',{replace:true})
    })
    .catch((err)=>{
      console.log(err.message);
      if(err.code=="auth/user-not-found")
      {
        setError("user not found, please recheck your email")
      }
      else if(err.code=="auth/wrong-password")
      {
        setError("wrong password,please try again")
      }
      else if(err.code=="auth/internal-error")
      {
        setError("invalid email,please try again")
      }
      //setError(err.message)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <br/>
        {error&&<p className='error'>{error}</p>}
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>{
              setEmailError('')
              setEmail(e.target.value)
              //let mk=validateEmail?'':"invalid email"
              //setEmailError(mk)
              }}
          />
          <br/>
          <span className='error'>{emailError}</span>
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
              //let jk= validatePassword(e.target.value)?'':"password should be stronger"
           //setPasswordError(jk)
            }}
          />
          <br/>
          <span className='error'>{passwordError}</span>
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{navigate('/signup')}}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
