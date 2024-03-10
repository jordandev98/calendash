<script>

    import {formatEventDuration} from "../../../service/date/TimeService.ts";
    import Icon from "@iconify/svelte";
    import EventCard from "$lib/event/EventCard.svelte";
    import AccountEmptyCard from "$lib/account/AccountEmptyCard.svelte";
    import {langStrings} from "../../../text/langText.js";
    import {langStore} from "../../../store/langStore.js";

    export let data;

    const events = data.page?.events;

</script>

<div class="flex flex-col gap-4  w-11/12 pt-8">
    <ol class="breadcrumb">
        <li class="crumb"><a class="anchor" href="/account">{langStrings[$langStore]["accountMenu"]}</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li>{langStrings[$langStore]["eventMenu"]}</li>
    </ol>
    <div class="flex items-center justify-between">
        <p class="text-2xl font-semibold">{langStrings[$langStore]["accountEventTitle"]}</p>
        <a href="/account/events/create">
            <button class="btn variant-filled-primary w-fit">{langStrings[$langStore]["eventPageCreateAction"]}</button>
        </a>
    </div>


    {#if events && events.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-col justify-between gap-4 w-full">
            {#each events as event}
                <EventCard {event}/>
            {/each}
        </div>
        {:else}
        <AccountEmptyCard title={langStrings[$langStore]["eventPageTitle"]} description={langStrings[$langStore]["eventPageDescription"]}
                          link="/account/events/create" action={langStrings[$langStore]["eventPageAction"]}/>
    {/if}


</div>
