<script>

    import {authHandler} from "../../store/store.js";
    import Icon from '@iconify/svelte';
    import {goto} from "$app/navigation";

    const handleGoogleLogin = async () => {
        try {
            await authHandler.signInWithProvider();
            goto("/")
        } catch (err) {

        }
    }

</script>


<div class="flex w-full h-full items-center justify-center ">

    <form class="flex items-center w-2/3 xl:w-1/3 flex-col gap-8 p-4">
        <!-- Separator between social media sign in and email/password sign in -->
        <div class="flex flex-col gap-4">
            <p class="text-4xl font-semibold">Sign in to your account</p>
        </div>

        <div class="grid grid-cols-1 gap-4">
            <button class="btn variant-filled border-2 border-gray-300 flex items-center gap-2"
                    on:click={handleGoogleLogin}>Log in with Google
                <Icon icon="flat-color-icons:google" width="32"/>
            </button>
        </div>

    </form>
</div>