<script>
    import CalendarCard from "$lib/settings/CalendarCard.svelte";
    import {Toast} from "@skeletonlabs/skeleton";
    import {goto} from "$app/navigation";
    import AccountEmptyCard from "$lib/account/AccountEmptyCard.svelte";
    import {langStrings} from "../../../text/langText.js";
    import {langStore} from "../../../store/langStore.js";

    export let data;

    const page = data.page;
    const handleAddNewCalendar = () => {

        if (!page) {
            goto("/account/page")
        }

        else if (page.calendars.length === 0) {
            goto("/account/settings/calendar/create")
        }

    }

    if (!page)
        handleAddNewCalendar()

</script>

{#if data && data.page}
    <div class="flex flex-col w-11/12 py-12 gap-8">
        <ol class="breadcrumb">
            <li class="crumb"><a class="anchor" href="/account">{langStrings[$langStore]["accountMenu"]}</a></li>
            <li class="crumb-separator" aria-hidden>&rsaquo;</li>
            <li>{langStrings[$langStore]["calendarMenu"]}</li>
        </ol>

        <div class="flex w-full items-center justify-between">

            <h2 class="text-2xl font-semibold">{langStrings[$langStore]["createCalendarPageTitle"]}</h2>
            <a href="/account/settings/calendar/create">
                <button class="btn variant-filled-primary">{langStrings[$langStore]["createCalendarPageAction"]}</button>
            </a>
        </div>
        {#if page.calendars && page.calendars.length > 0}
            <CalendarCard {page}/>
        {:else}
            <AccountEmptyCard title={langStrings[$langStore]["createEmptyCalendarPageTitle"]} description={langStrings[$langStore]["createEmptyCalendarPageDescription"]}
                              link="/account/settings/calendar/create" action={langStrings[$langStore]["createEmptyCalendarPageAction"]}/>
        {/if}


        <Toast/>
    </div>
    {:else}
    <div>
        {#each {length: 3} as _, i}
            <li>{i + 1}</li>
        {/each}
    </div>
{/if}