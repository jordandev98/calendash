<script>

    import {authStore} from "../../store/store.js";
    import Icon from "@iconify/svelte";
    import {getToastStore, Toast} from "@skeletonlabs/skeleton";

    const handleAuthorizationError = () => {
        toastStore.trigger({message: "Your account has not authorized to access your calendar! Please retry"})
        authStore.set({
            user: null,
            loading: false,
        })
    }

    const toastStore = getToastStore();

</script>


<div class="flex w-full h-2/3 items-center justify-center ">

    <form class="flex items-center  flex-col gap-8 px-16 py-8 border bg-gray-50 rounded-xl" method="post" action="?/OAuth2">
        <!-- Separator between social media sign in and email/password sign in -->
        <img src="/logo.png" alt="logo.png" class=" aspect-square w-20">
        <div class="flex flex-col items-center gap-8">
            <p class="text-2xl font-semibold">Welcome to Calendash !</p>
            <p>Join us for free ! You are only 5 minutes away of starting taking online bookings</p>
        </div>

        <div class="grid grid-cols-1 gap-4">
            <button class="btn rounded-xl font-semibold border-2 flex items-center gap-2">Continue with Google
                <Icon icon="flat-color-icons:google" width="32"/>
            </button>
        </div>
    </form>
    <Toast/>
</div>