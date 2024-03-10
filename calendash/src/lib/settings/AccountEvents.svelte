<script>

    import EventCard from "$lib/event/EventCard.svelte";
    import AccountEmptyCard from "$lib/account/AccountEmptyCard.svelte";
    import {langStrings} from "../../text/langText.js";
    import {langStore} from "../../store/langStore.js";

    export let events;

</script>

<div class="flex flex-col items-start gap-4">
    <div class="flex items-center justify-between w-full">
        <a href="/account/events">
            <h2 class="text-2xl font-semibold">{langStrings[$langStore]["accountEventTitle"]}</h2>
        </a>

    </div>


    {#if events && events.length > 0}
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 flex-col justify-between gap-4 w-full">
            {#each events as event}
                <EventCard {event}/>
            {/each}

        </div>
    {:else}
        <AccountEmptyCard title={langStrings[$langStore]["emptyEventCardTitle"]} description={langStrings[$langStore]["emptyEventCardTitle"]}
                          link="/account/events/create" action={langStrings[$langStore]["emptyEventCardTitle"]}/>

    {/if}
</div>

