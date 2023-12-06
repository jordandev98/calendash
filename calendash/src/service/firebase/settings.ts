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

export const fetchUser = async () => {
    const auth = getAuth();
    const { uid } = auth.currentUser || {};
    if (!uid) throw new Error('User not logged in');

    try {
        return await fetch(`${import.meta.env.VITE_API_URL}/user/${uid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    } catch (error) {
        console.error('Error fetching userCalendar:', error);
        return null; // Return null on error
    }
};
