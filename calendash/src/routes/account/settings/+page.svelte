<script>
    import CalendarCard from "$lib/settings/CalendarCard.svelte";
    import {getModalStore, Modal} from "@skeletonlabs/skeleton";
    import {goto} from "$app/navigation";
    import UpgradePlan from "$lib/modal/UpgradePlan.svelte";

    export let data;

    const page = data.page;
    const activeSubscriptions = data.activeSubscriptions;
    const handleAddNewCalendar = () => {
        if (page.calendars.length === 0) {
            goto("/account/settings/calendar/create")
        }

    }

    if (!page)
        handleAddNewCalendar()

    const modalUpgradePlan = {ref : UpgradePlan}
    const upgradeModal = {
        type: 'component',
        component: modalUpgradePlan,
    };
    const modalStore = getModalStore();

</script>


<div class="flex flex-col w-11/12 py-12 gap-8">
    {#if activeSubscriptions.totalQuantity >= page.calendars.length }
        <a class="w-full" href="/account/settings/calendar/create">
            <button class="w-full btn variant-filled-primary">Add calendar</button>
        </a>
        {:else}
        <button class="w-full btn variant-filled-primary" on:click={() => modalStore. trigger(upgradeModal)}>Add calendar</button>
        <Modal />
    {/if}
    <h2 class="text-2xl font-semibold">My calendars</h2>
    <CalendarCard {page}/>


</div>