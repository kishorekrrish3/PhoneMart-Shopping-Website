// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Add this import
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8BnfE5hu3VrmPyVuiGFe8_bThF9A4Ku0",
  authDomain: "phonemart-ce3a9.firebaseapp.com",
  projectId: "phonemart-ce3a9",
  storageBucket: "phonemart-ce3a9.appspot.com",
  messagingSenderId: "1046992881845",
  appId: "1:1046992881845:web:80ddd0e37c66681a9cd6fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const db = getFirestore(app); // Initialize Firestore
