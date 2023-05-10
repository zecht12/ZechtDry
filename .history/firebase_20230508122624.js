// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs forgle.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional Firebase products that you want to use
// https://firebase.goo
const firebaseConfig = {
    apiKey: "AIzaSyA-J4fAszd6R2n6FYeM7ZCy8-dZmddi0uM",
    authDomain: "zechtdry.firebaseapp.com",
    projectId: "zechtdry",
    storageBucket: "zechtdry.appspot.com",
    messagingSenderId: "819888721456",
    appId: "1:819888721456:web:fc4fb21d116f16a5e527f5",
    measurementId: "G-629NQZMNBC"
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

export default app;
export { auth, db, storage };