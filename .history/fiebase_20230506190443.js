// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCg_lqWYYf6wIwhs10L110S8Qj8yRIjuZA",
    authDomain: "zechtbooks-a4147.firebaseapp.com",
    projectId: "zechtbooks-a4147",
    storageBucket: "zechtbooks-a4147.appspot.com",
    messagingSenderId: "401250440456",
    appId: "1:401250440456:web:83542c14e0c335d90308bd",
    measurementId: "G-ZX484QFCTZ"
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

export default app;
export { auth, db, storage };