import {collection, getDoc, getDocs, getFirestore, query, where} from "firebase/firestore";
import {db} from "../../service/firebase/firebase.js";

export async function load({params}) {
    const fetchCalendarByUrl = async (url) => {
        console.log(url)

        const settingsCollection = collection(db, "settings");

        const filteredQuery = query(settingsCollection, where("settings.url", "==", url));
        const querySnapshot = await getDocs(filteredQuery)

        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
            });
            return querySnapshot.docs.map(doc => doc.data());
        } else {
            console.log('No settings with this URL!');
            return null;
        }
    }

    return {
        calendar : await fetchCalendarByUrl(params.url)
    }
}