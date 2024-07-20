import React,{useEffect,useContext} from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { AuthContext, FirebaseContext, FirebaseProvider } from './store/firebaseContext';
import {Post} from './store/postContext';

import Home from './Pages/Home';
import SignupPage from './Pages/Signup'
import Login from './Components/Login/Login';
import CreatePage from './Components/Create/Create'
import ViewPost from './Pages/ViewPost';
import { AuthProvider } from './store/authcontext';
function App() {
  const {user,setUser}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  useEffect(()=>{
   firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
console.log(user);
  })
  return (
    <FirebaseProvider>
      <AuthProvider>
    <div>
    <Post>
      <Router>
      
        <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/signup' element={<SignupPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/create' element={<CreatePage />} />
              <Route path='/view' element={<ViewPost />} />
            </Routes>
      
      </Router>
      </Post>
    </div>
    </AuthProvider>
    </FirebaseProvider>
  );
}

export default App;
