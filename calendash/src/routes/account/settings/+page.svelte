<script>
    import CalendarCard from "$lib/settings/CalendarCard.svelte";
    import {getModalStore, Toast} from "@skeletonlabs/skeleton";
    import {goto} from "$app/navigation";
    import UpgradePlan from "$lib/modal/UpgradePlan.svelte";
    import AccountEmptyCard from "$lib/account/AccountEmptyCard.svelte";

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

    const modalUpgradePlan = {ref: UpgradePlan}
    const upgradeModal = {
        type: 'component',
        component: modalUpgradePlan,
    };
    const modalStore = getModalStore();

</script>


<div class="flex flex-col w-11/12 py-12 gap-8">
    <ol class="breadcrumb">
        <li class="crumb"><a class="anchor" href="/account">Account</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li>Calendars</li>
    </ol>

    <div class="flex w-full items-center justify-between">

        <h2 class="text-2xl font-semibold">My calendars</h2>
        <a href="/account/settings/calendar/create">
            <button class="btn variant-filled-primary">Add calendar</button>
        </a>
    </div>
    {#if page.calendars && page.calendars.length > 0}
        <CalendarCard {page}/>
    {:else}
        <AccountEmptyCard title="Create your first calendar" description="Create your schedule, link it with Google Calendars, and start accepting
                        bookings or appointments seamlessly."
                          link="/account/settings/calendar/create" action="Create your first calendar"/>
    {/if}


    <Toast/>
</div>