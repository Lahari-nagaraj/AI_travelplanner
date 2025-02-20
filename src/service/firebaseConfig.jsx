// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD02snI0arWF0iyCyj8Yw3ImPTpDo8y5P4",
  authDomain: "ai-travelplanner-a3476.firebaseapp.com",
  projectId: "ai-travelplanner-a3476",
  storageBucket: "ai-travelplanner-a3476.firebasestorage.app",
  messagingSenderId: "651668291688",
  appId: "1:651668291688:web:1ed58a13a99d74f79e3bdd",
  measurementId: "G-64FYMKNP6F",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);
