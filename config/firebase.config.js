// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "unipeers-977de.firebaseapp.com",
  projectId: "unipeers-977de",
  storageBucket: "unipeers-977de.firebasestorage.app",
  messagingSenderId: "836247523828",
  appId: "1:836247523828:web:8480dac838147ed5ece9a1"
};

// Initialize Firebase
const app = getApps.length == 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app)

export { db }