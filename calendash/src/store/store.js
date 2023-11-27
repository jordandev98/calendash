import {writable} from "svelte/store";
import {GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth"

import {goto} from "$app/navigation";
import {auth} from "../service/firebase/firebase.js";
import {authorizeServiceAccount} from "../service/calendar/authorization.js";

export const authStore = writable({
    user: null,
    loading: true,

})

export const authHandler = {
    logout: async () => {
        await signOut(auth)
    },
    signInWithProvider: async (token) => {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/calendar');
        const result = await signInWithPopup(auth, provider);
        const { _tokenResponse } = result;
        const { oauthAccessToken, refreshToken } = _tokenResponse;
        const  calendarId = result.user.email;
        return await authorizeServiceAccount(oauthAccessToken, calendarId);

    }


}