import {getAuth} from "firebase/auth";
import {app, db} from "./firebase.js";
import {doc, setDoc , getDoc} from "firebase/firestore";


export const saveSettings = async (settings) => {
    const auth = getAuth(app);
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not logged in");

    const userRef = doc(db, 'users', userId);

    try {
        await setDoc(userRef, {
            settings : settings
            // Add other user-related data here
        });
    } catch (error) {
        console.error('Error initializing new user:', error);
    }
};


export const fetchSettings = async (userId) => {
    const userRef = doc(db, 'users', userId);

    try {
        const docSnapshot = await getDoc(userRef);
        if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            if (userData.settings) {
                console.log(userData.settings)
                return userData.settings;
            } else {
                console.log('Settings not found for this user');
                return null; // Return null if settings not found
            }
        } else {
            console.log('User document does not exist');
            return null; // Return null if user document doesn't exist
        }
    } catch (error) {
        console.error('Error fetching settings:', error);
        return null; // Return null on error
    }
};