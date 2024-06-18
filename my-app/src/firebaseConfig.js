// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyALx_WocuMofJHm777a_sAffWEEye4CPbg",
    authDomain: "fir-frontend-7d4bd.firebaseapp.com",
    projectId: "fir-frontend-7d4bd",
    storageBucket: "fir-frontend-7d4bd.appspot.com",
    messagingSenderId: "492039863666",
    appId: "1:492039863666:web:a444bc504f542c8131f1eb",
    measurementId: "G-XMBEKLEJSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Get the Auth instance
const db = getFirestore(app);
export { app, auth, db }; // Export both app and auth
