import {writable} from "svelte/store";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"

import {goto} from "$app/navigation";
import {auth, provider} from "../service/firebase/firebase.js";


export const authStore = writable({
    user: null,
    loading: true,

})


export const authHandler = {
    signup: async (/** @type {string} */ email, /** @type {string} */ password) => {
        await createUserWithEmailAndPassword(auth, email, password)
    },
    login: async (/** @type {string} */ email, /** @type {string} */ password) => {
        const res = await signInWithEmailAndPassword(auth, email, password)
        if (res) {
            authStore.set({
                user: res,
                isLoading: false
            })
        }
    },
    logout: async () => {
        await signOut(auth)
    },
    signInWithProvider: () => {
        signInWithPopup(auth, provider).then()
        goto("/")
    }

}