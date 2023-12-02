import {getAuth} from "firebase/auth";
import {db} from "./firebase.js";
import {collection, doc, getDoc, setDoc} from "firebase/firestore";
import type {UserCalendar} from "../../data/userCalendar";


export const saveUserCalendar = async (userCalendar: UserCalendar) => {
    const auth = getAuth();
    const {uid} = auth.currentUser || {};
    if (!uid) throw new Error('User not logged in');

    try {
        const userCalendarRef = doc(collection(db, 'userCalendars'), uid);
        await setDoc(userCalendarRef, {
            uid,
            userCalendar, // Nest the UserCalendar object under the key 'userCalendar'
        });

        console.log('UserCalendar and CalendarEntry saved successfully');
    } catch (error) {
        console.error('Error saving settings:', error);
    }
};

export const fetchSettings = async () => {
    const auth = getAuth();
    const { uid } = auth.currentUser || {};
    if (!uid) throw new Error('User not logged in');

    const userRef = doc(db, 'userCalendars', uid);

    try {
        const docSnapshot = await getDoc(userRef);
        if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            if (userData.userCalendar) {
                return userData.userCalendar; // Return the userCalendar data
            } else {
                console.log('UserCalendar not found for this user');
                return null; // Return null if userCalendar not found
            }
        } else {
            console.log('User document does not exist');
            return null; // Return null if user document doesn't exist
        }
    } catch (error) {
        console.error('Error fetching userCalendar:', error);
        return null; // Return null on error
    }
};
