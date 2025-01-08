import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// App's Firebase configuration
const firebaseConfig = {
   apiKey:import.meta.env.VITE_FIREBASE_API,
   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
   storageBucket: import.meta.env.VITE_FIREBASE_BUCKET,
   messagingSenderId: import.meta.env.VITE_FIREBASE_MSGSENDERID,
   appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
