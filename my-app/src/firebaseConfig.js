import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

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
const auth = getAuth(app);
const db = getFirestore(app);

// Reference to the users collection
const usersCollectionRef = collection(db, 'users');

// Export instances
export { app, auth, db, usersCollectionRef };
