// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDu9SfOllMDCeXphYN1mV_9hdcfLtlK98w",
  authDomain: "arenabank-3a693.firebaseapp.com",
  projectId: "arenabank-3a693",
  storageBucket: "arenabank-3a693.firebasestorage.app",
  messagingSenderId: "547334674781",
  appId: "1:547334674781:web:38517de9560c2bb47470b4",
  measurementId: "G-6L8YT02876"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, database };