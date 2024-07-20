// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGj-mmuakXlRDkmzUffPiz0FOiymYByXo",
  authDomain: "olx-x-dc086.firebaseapp.com",
  projectId: "olx-x-dc086",
  storageBucket: "olx-x-dc086.appspot.com",
  messagingSenderId: "143674531899",
  appId: "1:143674531899:web:ad25930bd898c31930fc1e",
  measurementId: "G-T0RCZ5VT4L"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
