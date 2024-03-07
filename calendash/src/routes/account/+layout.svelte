<script>
    import {authStore} from "../../store/store.js";
    import {goto} from "$app/navigation";
    import Icon from "@iconify/svelte";
    import {page} from '$app/stores';


    const accountNavItems = [
        // {
        //     value: "aaaaaa",
        //     href: "/account/",
        //     icon: "mdi:account",
        //     name: "Account"
        // },
        {
            value: "page",
            href: "/account/page",
            icon: "uil:bill",
            name: "My page"
        },
        {
            value: "events",
            href: "/account/events",
            icon: "mdi:calendar-star",
            name: "Events"
        },
        {
            value: "settings",
            href: "/account/settings",
            icon: "mdi:calendar-multiple",
            name: "Calendars"
        },
        {
            value: "plans",
            href: "/account/plans",
            icon: "uil:bill",
            name: "Plans & billings"
        },

    ]

    const findNavItems = () => {

        return accountNavItems.some(item => {
            $page.url.pathname.includes(item.value);
        });
    };

    const handleDisconnect = () => {
        authStore.set({user: null, loading: false});
        document.cookie = "token_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        goto("/")
    }

</script>

<div class="flex flex-1 h-full">
    <aside id="default-sidebar"
           class="flex flex-col  bg-gray-100 border pt-8"
           aria-label="Sidebar">

        <div class="flex items-center justify-center">
            <a href="/">
                <img src="/logo.png" alt="logo.png" class=" aspect-square w-14">
            </a>
        </div>
        <div class="flex flex-col h-full justify-between  px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
            <ul class="flex flex-col gap-2 font-medium px-2">
                {#if $page.url.pathname === "/account"}
                    <li class="rounded-xl">
                        <a href={"/account"} data-sveltekit-preload-data=""
                           class="">
                            <button class={"flex items-center justify-center md:justify-start  p-2 bg-gray-200 w-full rounded-xl"}
                                    on:click={() => findNavItems()}>
                                <Icon class="text-gray-600" icon={"mdi:account"} width="24"/>
                                <span class="hidden ms-3 text-gray-500 md:block">Account</span>
                            </button>
                        </a>
                    </li>
                    {:else}
                    <li class="rounded-xl">
                        <a href={"/account"} data-sveltekit-preload-data=""
                           class="">
                            <button class={"flex items-center justify-center md:justify-start  p-2 w-full rounded-xl"}
                                    on:click={() => findNavItems()}>
                                <Icon class="text-gray-600" icon={"mdi:account"} width="24"/>
                                <span class="hidden ms-3 text-gray-500 md:block">Account</span>
                            </button>
                        </a>
                    </li>
                {/if}
                {#each accountNavItems as navItem , i}

                    {#if $page.url.pathname.includes(navItem.value)}
                        <li class="rounded-xl">
                            <a href={navItem.href} data-sveltekit-preload-data=""
                               class="">
                                <button class={"flex items-center justify-center md:justify-start  p-2 bg-gray-200 w-full rounded-xl"}>
                                    <Icon class="text-gray-600" icon={navItem.icon} width="24"/>
                                    <span class="hidden ms-3 text-gray-500 md:block">{navItem.name}</span>
                                </button>
                            </a>
                        </li>
                    {:else}
                        <li class="rounded-xl">
                            <a href={navItem.href} data-sveltekit-preload-data=""
                               class="">
                                <button class={"flex items-center justify-center md:justify-start p-2 text-gray-900 rounded-lg  dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group w-full" }>
                                    <Icon class="text-gray-600" icon={navItem.icon} width="24"/>
                                    <span class="hidden ms-3 text-gray-500 md:block">{navItem.name}</span>
                                </button>
                            </a>
                        </li>
                    {/if}
                {/each}
            </ul>
            <div class="flex items-center justify-center">
                <button class="btn variant-glass rounded-xl w-full " on:click={() =>handleDisconnect()}>
                    <Icon class="text-gray-600" icon="mdi:logout" width="24"/>
                    <span class="hidden md:block">Logout</span>
                </button>
            </div>

        </div>
    </aside>


    <div class="flex flex-1 justify-center pb-12">
        <slot></slot>
    </div>

</div>