<script>
    import {Avatar, LightSwitch, popup} from "@skeletonlabs/skeleton";
    import {authStore} from "../store/store.js";


    const popupClick = {
        event: 'click',
        target: 'popupAvatar',
        placement: 'bottom',
    };


    let user;

    authStore.subscribe(value => {
        console.log(value)
        user = value.user
    })

    const handleDisconnect = () => {
        authStore.set({user : null , loading: false});
        document.cookie = "token_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

</script>

<div class="flex flex-row-reverse md:flex-row items-center justify-between gap-6 ">

    <button use:popup={popupClick}>
        <Avatar src={user.picture} initials={user.name} width="w-10"
                background="bg-primary-600" fill="fill-token"/>
    </button>

    <div class="hidden card w-72 shadow-xl rounded" data-popup="popupAvatar">
        <div class="flex flex-col gap-4 p-4">
            <div class="flex flex-col gap-4">
                <p class="font-semibold">Account settings</p>
                <a href="/account">My account</a>
            </div>

            <div class="flex items-center justify-center">
                <button class="btn variant-filled w-full" on:click={handleDisconnect}>Sign out</button>
            </div>

        </div>
    </div>

</div>

