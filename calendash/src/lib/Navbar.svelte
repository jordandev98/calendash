<script>
    import Icon from "@iconify/svelte";
    import {Drawer, getDrawerStore} from "@skeletonlabs/skeleton";
    import AvatarMenu from "$lib/AvatarMenu.svelte";
    import {authStore} from "../store/store.js";

    const drawerSettings = {
        id: 'example-3',
        // Provide your property overrides:
        width: 'w-[320px]',
        padding: 'p-4',
        rounded: 'rounded-xl',
    };
    const drawerStore = getDrawerStore();

    const handleDrawerOpen = () => {
        drawerStore.open(drawerSettings)
    }
    console.log($authStore)

</script>

<div class="flex justify-center shadow-md">
    <div class="flex justify-between self-center py-4 w-11/12 items-center">
        <div class="flex items-center justify-center flex-2 gap-4">
            <button class="flex md:hidden" on:click={handleDrawerOpen}>
                <Icon icon="iconamoon:menu-burger-horizontal-duotone" width="28"/>
            </button>

            <a href="/" class="flex items-center gap-2 justify-center">
                <img src="/logo.png" alt="logo.png" class=" aspect-square w-12">
                <p class="text-3xl font-extrabold hidden lg:block">Calendash</p>
            </a>
        </div>
        <div class="font-bold text-lg items-center justify-center flex-1 gap-8 hidden md:flex ">
            <a href="/product" class="hover:text-surface-500">Product</a>
            <a href="/pricing" class="hover:text-surface-500">Pricing</a>
            <a href="/calendar" class="hover:text-surface-500">My calendar</a>
        </div>

        <div class=" items-center justify-end gap-4">
            {#if $authStore.user}
                <AvatarMenu/>
            {:else}

                <a href="/login">
                    <button class="btn variant-filled">Get started</button>
                </a>
            {/if}
        </div>

    </div>

    <Drawer>
        <div class="flex flex-col w-full h-full p-4">
            <div class="flex flex-col p-8   flex-1 gap-8 ">
                <a href="/" class="flex self-center items-center "><img src="/logo.png" alt="logo.png"
                                                                        class="aspect-square w-14">
                    <p class="text-4xl font-semibold">Calendash</p></a>
                <div class="flex flex-col gap-6 w-full">
                    <a href="/generate" class="hover:text-indigo-400">
                        <button on:click={drawerStore.close}>Generate</button>
                    </a>
                    <a href="/showcase" class="hover:text-indigo-400">
                        <button on:click={drawerStore.close}>Showcase</button>
                    </a>
                    <a href="/pricing" class="hover:text-indigo-400">
                        <button on:click={drawerStore.close}>Pricing</button>
                    </a>

                </div>

            </div>
        </div>

    </Drawer>
</div>
