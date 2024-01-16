<script>

    import {authStore} from "../../../store/store.js";

    let user;

    authStore.subscribe(value => {
        user = value.user
    })
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
            <div class="flex justify-center items-center">
                <p class="font-bold">calendash.com/</p>
                <input class="w-full rounded px-1" name="url" bind:value={user.url}/>
            </div>

        </div>

        <button class="btn variant-filled-primary" type="submit">Create page</button>
    </div>
</form>
