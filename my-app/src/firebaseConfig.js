import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyALx_WocuMofJHm777a_sAffWEEye4CPbg",
    authDomain: "fir-frontend-7d4bd.firebaseapp.com",
    projectId: "fir-frontend-7d4bd",
    storageBucket: "fir-frontend-7d4bd.appspot.com",
    messagingSenderId: "492039863666",
    appId: "1:492039863666:web:a444bc504f542c8131f1eb",
    measurementId: "G-XMBEKLEJSQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
