// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, signOut} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRCs9MyKHUbDVquF9gsO4Vv1z-Mn8Du9A",
  authDomain: "techtemple-2e82c.firebaseapp.com",
  databaseURL: "https://techtemple-2e82c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "techtemple-2e82c",
  storageBucket: "techtemple-2e82c.appspot.com",
  messagingSenderId: "435533914800",
  appId: "1:435533914800:web:e1e3a52fb1c453b3cfd175",
  measurementId: "G-ZHB46GZ7RM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth, signOut};
 