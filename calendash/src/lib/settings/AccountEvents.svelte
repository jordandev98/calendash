<script>

    import EventCard from "$lib/event/EventCard.svelte";
    import AccountEmptyCard from "$lib/account/AccountEmptyCard.svelte";

    export let events;
</script>

<div class="flex flex-col items-start gap-4">
    <div class="flex items-center justify-between w-full">
        <a href="/account/events">
            <h2 class="text-2xl font-semibold">My events types</h2>
        </a>

    </div>


    {#if events && events.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-col justify-between gap-4 w-full">
            {#each events as event}
                <EventCard {event}/>
            {/each}

        </div>
    {:else}
        <AccountEmptyCard title="Create your first event type" description="The types of events they serve as a convenient tool for clients to book
                    appointments
                    with precise durations, streamlining the scheduling process for greater efficiency."
                          link="/account/events/create" action="Create your first event"/>

    {/if}
</div>

