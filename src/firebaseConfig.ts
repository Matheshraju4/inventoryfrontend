// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQd4sfyn3-HavPe0VN0zM1zeVfktgWGE8",
  authDomain: "gettoe-d7595.firebaseapp.com",
  projectId: "gettoe-d7595",
  storageBucket: "gettoe-d7595.appspot.com",
  messagingSenderId: "1018910005929",
  appId: "1:1018910005929:web:afc7d62c4c54f14946a7b8",
  measurementId: "G-QGXYS0YJTG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Sign up function
const signUpUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign in function
const signInUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const monitorAuthState = (callback: any) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      callback(user); // Pass the user object to the callback function
    } else {
      // User is signed out
      callback(null); // User is not signed in, pass null
    }
  });
};

// Sign out function
const logout = () => signOut(auth);
const storage = getStorage(app);

export { auth, storage, signUpUser, signInUser, logout, monitorAuthState };
