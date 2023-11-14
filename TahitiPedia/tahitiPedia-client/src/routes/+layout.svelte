<script>
    import "../app.postcss";
    import {arrow, autoUpdate, computePosition, flip, offset, shift} from '@floating-ui/dom';
    import {storePopup, Toast , toastStore  } from '@skeletonlabs/skeleton';
    import NavBar from "../components/NavBar.svelte";
    import {onMount} from 'svelte';
    import {updateUserFromCookie} from "../stores/userStore.js";

    storePopup.set({computePosition, autoUpdate, offset, shift, flip, arrow});
    onMount(async () => {
        try {
            await updateUserFromCookie()
        } catch (e) {
            toastStore.trigger({message : e.message, background: 'variant-ghost-error'})
        }

    });
</script>

<div class="mainContainer flex flex-col min-h-screen pb-12">
    <NavBar/>

    <slot></slot>

    <Toast/>
</div>


<style>
    :root {
        --theme-font-family-base: 'Inter', sans-serif;
        --theme-font-family-heading: 'Inter', sans-serif;

        min-width: 100%;
        min-height: 100vh;
        /* ... */
    }
</style>