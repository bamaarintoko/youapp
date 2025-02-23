// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAccGhz-4bp_mVGqF_i6dWa7grsL6uJXzk",
  authDomain: "youapp-aeabf.firebaseapp.com",
  projectId: "youapp-aeabf",
  storageBucket: "youapp-aeabf.firebasestorage.app",
  messagingSenderId: "425572672301",
  appId: "1:425572672301:web:21929eefbe38b3892be9a4",
  measurementId: "G-R1TNTCFFY0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
// const analytics = getAnalytics(app);