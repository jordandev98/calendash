<script>
    import "../app.postcss";
    import Navbar from "$lib/Navbar.svelte";
    import {initializeStores, storePopup} from '@skeletonlabs/skeleton';
    import {arrow, autoUpdate, computePosition, flip, offset, shift} from '@floating-ui/dom';
    import {onMount} from "svelte";
    import {auth} from "../service/firebase/firebase.js";
    import {authStore} from "../store/store.js";
    import {settingsStore} from "../store/settingsStore.js";
    import {fetchSettings} from "../service/firebase/settings.js";
    
    initializeStores();
    storePopup.set({computePosition, autoUpdate, offset, shift, flip, arrow});
    const authRoutes = ["/account"]
    onMount(() => {

        const unsubscribe = auth.onAuthStateChanged(async user => {
            const currentPath = window.location.pathname;
            if (!user && authRoutes.includes(currentPath)) {
                window.location.href = "/";
                return;
            }

            if (!user) {
                return;
            }


            authStore.set({
                user: auth.currentUser,
                isLoading: false
            })
            const settings = await fetchSettings(user.uid)
            console.log(settings)
            if (!settings) {
                return
            }
            settingsStore.set(
                settings
            )
        })


        return unsubscribe;

    })
</script>


<main class="mainContainer flex flex-col w-full">
    <div class="flex flex-col w-full min-h-screen bg-gray-50">
        <Navbar/>
        <slot/>
    </div>
</main>

<style>
    :root {
        min-width: 100%;
        min-height: 100vh;
        /* ... */
    }
</style>