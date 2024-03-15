<script>
    import "../app.postcss";
    import Navbar from "$lib/Navbar.svelte";
    import {initializeStores, storePopup} from '@skeletonlabs/skeleton';
    import {arrow, autoUpdate, computePosition, flip, offset, shift} from '@floating-ui/dom';
    import {authStore} from "../store/store.js";
    import {onMount} from "svelte";
    import {page} from '$app/stores'
    import Footer from "$lib/Footer.svelte";

    export let data;
    if (data?.user?.user?._id) {
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


<main class="mainContainer flex flex-col w-full h-full min-h-screen">

    <div class="flex flex-col flex-1 h-full bg-gray-100">
        <div class="flex flex-col min-h-screen ">

            {#if !$page.url.pathname.includes("/account") }
                <Navbar/>
            {/if}
            <slot/>
        </div>
        <Footer/>
    </div>
</main>

<style>
    :root {
        min-width: 100%;
        min-height: 100vh;
    }
</style>