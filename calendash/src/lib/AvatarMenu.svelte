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

    <a href="/account">
    <Avatar src={user.picture} initials={user.name} width="w-10"
            background="bg-primary-600" fill="fill-token"/>
    </a>
</div>

