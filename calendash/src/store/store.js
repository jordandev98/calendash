import {writable} from "svelte/store";
import {GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth"
import {auth} from "../service/firebase/firebase.js";

export const authStore = writable({
    user: null,
    loading: true,

})

export const authHandler = {
    logout: async () => {
        await signOut(auth)
    },
    signInWithProvider: async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/calendar');
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        const {oauthAccessToken} = result._tokenResponse;
        const calendarId = result.user.email;

        return await fetch(`${import.meta.env.VITE_API_URL}/calendar/authorize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                calendarId: calendarId,
                accessToken: oauthAccessToken,
                userId : result.user.uid,
                email : result.user.email,
                provider : result.providerId
            })
        });
    }


}