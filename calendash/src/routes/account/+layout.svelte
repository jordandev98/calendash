<script>
    import {AppRail, AppRailAnchor} from "@skeletonlabs/skeleton";
    import Icon from "@iconify/svelte";

    let currentTile = 0;


    const accountNavItems = [
        {
            href: "/account",
            icon: "mdi:account",
            name: "Account"
        },
        {
            href: "/account/events",
            icon: "mdi:calendar-multiple",
            name: "My events"
        },
        {
            href: "/account/settings",
            icon: "mdi:clock-outline",
            name: "My schedule"
        },
        {
            href: "/account/plans",
            icon: "uil:bill",
            name: "Plans & billings"
        },
    ]
</script>

<div class="flex flex-1">
    <AppRail height="h-auto" background="bg-gray-50" class="shadow-md">

        {#each accountNavItems as navItem , i}
            <AppRailAnchor href={navItem.href} bind:group={currentTile} name="myCalendars" value={i}
                           title="myCalendars">
                <svelte:fragment slot="lead">
                    <div class="flex items-center justify-center">
                        <Icon icon={navItem.icon} width="24"/>
                    </div>
                </svelte:fragment>
                <span>{navItem.name}</span>
            </AppRailAnchor>
        {/each}
        <svelte:fragment slot="trail">
            <AppRailAnchor href="/" target="_blank" title="Account">(icon)</AppRailAnchor>
        </svelte:fragment>
    </AppRail>
    <div class="flex flex-1 justify-center">
        <slot></slot>
    </div>

</div>