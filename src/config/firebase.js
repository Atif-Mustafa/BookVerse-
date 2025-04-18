// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVIJTA167D0tcpETFeRSsYWzn7d5C2Lgw",
  authDomain: "book-app-de8aa.firebaseapp.com",
  projectId: "book-app-de8aa",
  storageBucket: "book-app-de8aa.firebasestorage.app",
  messagingSenderId: "476753072270",
  appId: "1:476753072270:web:729838807c378da44d39df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

