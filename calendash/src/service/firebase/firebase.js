// Import the functions you need from the SDKs you need
import {getApp, getApps, initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getAnalytics} from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSENGER_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
    scopes: ['email', 'profile', 'https://www.googleapis.com/auth/calendar'],
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const analytics = app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;

const provider = new GoogleAuthProvider();
export const initFirebase = () => {
    return app;
};

export const getCurrentUser = async() => {
    return auth.currentUser;
}

export {app ,auth, db, analytics, provider}