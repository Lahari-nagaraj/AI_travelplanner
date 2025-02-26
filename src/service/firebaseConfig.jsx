// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDN4qlBMi-YKFqbKAZK5DjlHUKdf4YHb4",
  authDomain: "travel-6251b.firebaseapp.com",
  projectId: "travel-6251b",
  storageBucket: "travel-6251b.firebasestorage.app",
  messagingSenderId: "928829480668",
  appId: "1:928829480668:web:8c5b14f387a71fb7371e19",
  measurementId: "G-GWC2TW7M7T",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);
//const analytics = getAnalytics(app);
