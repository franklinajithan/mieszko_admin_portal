// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDUJWIfjzi4Ah9DG-7P0t0o9Jvzv7uGGfM",
  authDomain: "mieszko-retail.firebaseapp.com",
  projectId: "mieszko-retail",
  storageBucket: "mieszko-retail.firebasestorage.app",
  messagingSenderId: "772889333788",
  appId: "1:772889333788:web:07019054aaa2f003e70fd9",
  measurementId: "G-Z9KQG45BD6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);