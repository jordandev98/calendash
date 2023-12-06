<script>

    import {authHandler, authStore} from "../../store/store.js";
    import Icon from "@iconify/svelte";
    import {goto} from "$app/navigation";
    import {getToastStore, Toast} from "@skeletonlabs/skeleton";

    const handleAuthorizationError = () => {
        toastStore.trigger({message: "Your account has not authorized to access your calendar! Please retry"})
        authStore.set({
            user: null,
            loading: false,
        })
    }

    const toastStore = getToastStore();
    const handleGoogleLogin = async () => {
        try {
            const res = await authHandler.signInWithProvider();
            console.log(res)
            if (res.status < 300) {
                await goto("/account")
                return;
            }

            handleAuthorizationError()
        } catch (err) {
            handleAuthorizationError()
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
    <Toast/>
</div>