// client/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcDcObXHLMNDosypVS2XwBfr3R4pIg3Uo",
  authDomain: "resume-builder-cbbe1.firebaseapp.com",
  projectId: "resume-builder-cbbe1",
  storageBucket: "resume-builder-cbbe1.firebasestorage.app",
  messagingSenderId: "1022266842420",
  appId: "1:1022266842420:web:024bed42d8f78e79e15961",
  measurementId: "G-YVYFH7LC7K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
