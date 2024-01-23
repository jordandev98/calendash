<script>

    import {authStore} from "../../../store/store.js";
    import {ProgressRadial} from "@skeletonlabs/skeleton";

    export let data;

    let user;

    authStore.subscribe(value => {
        user = value.user
    })

    if (data.page?._id) {
        user.url = data.page.url
    }

    let isUrlAvailable = false;
    let typingTimer;
    let isLoading = false;
    let isTaken = false;

    const waitUserToEndTyping = () => {
        isLoading = true;
        isTaken = false;
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => verifyUrlTaken(), 500);
    }

    const verifyUrlTaken = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/page/${user.url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status === 204) {
            isUrlAvailable = true;
            isLoading = false;
            return
        }
        isTaken = true;
        isLoading = false;
    }

</script>

<form class="w-11/12 my-12 p-8 max-w-2xl bg-gray-50 h-fit" method="post">
    <div class="flex flex-col gap-8 ">
        <p class="text-2xl font-bold">Create your appointement page</p>
        <p>Let's walk through the configuration together, ensuring your preferences and needs are seamlessly
            integrated. Sit back, relax, and let's tailor this platform to suit you perfectly.</p>
        <div class="flex flex-col gap-4">
            <p class="text-xl font-bold"> Create your link</p>
            <p>Pick a URL that's easy for your clients to remember and share for booking appointments. Make
                it
                short, descriptive, and memorable!</p>
            <div class="flex justify-center items-center gap-0.5 relative">
                <p class="font-bold">calendash.com/</p>
                <input class={isTaken ? "w-full rounded px-1 input-error": "w-full rounded px-1"} name="url" maxlength="28"
                       bind:value={user.url}
                       on:input={() => waitUserToEndTyping()}/>
                <div class="absolute inset-y-0 right-2 pl-3 flex items-center pointer-events-none">
                    {#if isLoading}
                        <ProgressRadial width="w-6"/>
                    {/if}
                </div>
            </div>
            {#if isTaken}
                <p class=" text-error-500">This url already exists please choose another one</p>
            {/if}
        </div>
        <button class="btn variant-filled-primary" type="submit" disabled={!user.url || !isUrlAvailable || isLoading}>
            {data.page?._id ? "Update url" : "Create page"}
        </button>
    </div>
</form>
