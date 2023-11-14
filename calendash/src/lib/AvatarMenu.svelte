<script>
    import {Avatar, popup} from "@skeletonlabs/skeleton";
    import {authStore} from "../store/store.js";


    const popupClick = {
        event: 'click',
        target: 'popupAvatar',
        placement: 'bottom',
    };


    let user;

    authStore.subscribe(value => {
        user = value.user
    })
</script>

<div class="flex flex-row-reverse md:flex-row items-center justify-between gap-6 ">

        <button use:popup={popupClick}>
            <Avatar src={user.providerData[0].photoURL} initials={"TT"} width="w-10"
                    background="bg-primary-600" fill="fill-token"/>
        </button>

        <div class="hidden card p-4 w-72 shadow-xl gap-4 rounded" data-popup="popupAvatar">

            <div class="flex flex-col gap-4">
                <a href="/account">My account</a>

                <button>Sign out</button>
            </div>
        </div>

</div>

