
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD_R3tRtH7Wx1t8L1RFcJglckB9v1aT2Vs",
  authDomain: "react-cursos-57833.firebaseapp.com",
  projectId: "react-cursos-57833",
  storageBucket: "react-cursos-57833.firebasestorage.app",
  messagingSenderId: "79935012289",
  appId: "1:79935012289:web:b50e49f940144cd77a8340",
  measurementId: "G-L6J957FPFB"
};

// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FireBaseApp);
export const FirebaseDB = getFirestore(FireBaseApp);