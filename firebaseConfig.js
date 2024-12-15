import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBm-siMww3plawluX3JMX5KY-i7y5YlLjw",
    authDomain: "mobilnaaplikacija-32306.firebaseapp.com",
    projectId: "mobilnaaplikacija-32306",
    storageBucket: "mobilnaaplikacija-32306.firebasestorage.app",
    messagingSenderId: "647662072280",
    appId: "1:647662072280:web:b472ec0040fae8478ec2ad"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };