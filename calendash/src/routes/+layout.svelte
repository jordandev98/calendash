<script>
    import "../app.postcss";
    import Navbar from "$lib/Navbar.svelte";
    import {initializeStores, storePopup} from '@skeletonlabs/skeleton';
    import {arrow, autoUpdate, computePosition, flip, offset, shift} from '@floating-ui/dom';
    import {authStore} from "../store/store.js";
    import {onMount} from "svelte";

    export let data;
    if (data?.user?.user?._id) {
        document.cookie = `email=${data.user.user.email}; max-age=2592000; path=/;`;
        authStore.set({user: data.user.user, loading: false})
    }


    initializeStores();
    storePopup.set({computePosition, autoUpdate, offset, shift, flip, arrow});


    onMount(async () => {
        const authRoutes = ["/account"]
        const currentPath = window.location.pathname;
        if (!$authStore.user && authRoutes.includes(currentPath)) {
            window.location.href = "/";
        }

    })
</script>


<main class="mainContainer flex flex-col w-full">
    <div class="flex flex-col min-h-screen bg-gray-100">
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