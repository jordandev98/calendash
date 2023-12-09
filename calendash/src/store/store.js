import {writable} from "svelte/store";

export const authStore = writable({
    user: null,
    loading: true,

})
