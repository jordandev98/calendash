<script>
    import {authStore} from "../../store/store.js";
    import {goto} from "$app/navigation";
    import Icon from "@iconify/svelte";

    let navSelected = 0;
    const accountNavItems = [
        {
            href: "/account/",
            icon: "mdi:account",
            name: "Account"
        },
        {
            href: "/account/page",
            icon: "uil:bill",
            name: "My page"
        },
        {
            href: "/account/events",
            icon: "mdi:calendar-star",
            name: "Events"
        },
        {
            href: "/account/settings",
            icon: "mdi:calendar-multiple",
            name: "Calendars"
        },
        {
            href: "/account/plans",
            icon: "uil:bill",
            name: "Plans & billings"
        },

    ]
    const handleDisconnect = () => {
        authStore.set({user: null, loading: false});
        document.cookie = "token_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        goto("/")
    }


</script>

<div class="flex flex-1 h-full">
    <aside id="default-sidebar"
           class="flex flex-col w-60 bg-gray-100 border pt-8"
           aria-label="Sidebar">
        <div class="flex items-center justify-center">
            <a href="/">
                <img src="/logo.png" alt="logo.png" class=" aspect-square w-14">
            </a>

        </div>

        <div class="flex flex-col h-full justify-between  px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
            <ul class="flex flex-col gap-2 font-medium">
                {#each accountNavItems as navItem , i}
                    <li class="rounded-xl">
                        <a href={navItem.href}
                           class="">
                            <button class={navSelected === i ? "flex items-center p-2 bg-gray-200 w-full rounded-xl" : "flex items-center p-2 text-gray-900 rounded-lg  dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group w-full"}
                                on:click={()=> navSelected = i}>
                                <Icon class="text-gray-600" icon={navItem.icon} width="24"/>
                                <span class="ms-3 ext-gray-500">{navItem.name}</span>
                            </button>

                        </a>
                    </li>
                {/each}
            </ul>
            <div class="flex items-center justify-center" >
                <button class="btn variant-glass rounded-xl w-full " on:click={() =>handleDisconnect()}>
                    <Icon class="text-gray-600" icon="mdi:logout" width="24"/>
                    <span>Logout</span>
                </button>
            </div>

        </div>
    </aside>

    <div class="flex flex-1 justify-center">
        <slot></slot>
    </div>

</div>