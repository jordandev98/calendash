<script>

    import EventCard from "$lib/event/EventCard.svelte";

    export let events;
</script>

<div class="flex flex-col items-start gap-4">
    <div class="flex items-center justify-between w-full">
        <a href="/account/events">
            <h2 class="text-2xl font-semibold">My events types</h2>
        </a>

    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-col justify-between gap-4 w-full">
        {#if events}
            {#each events as event}
                <EventCard {event}/>
            {/each}
        {:else}
            <div class="flex flex-col gap-4 items-center">
                <h3 class="text-xl font-semibold">Create your first event type</h3>
                <p class="text-center">The types of events they serve as a convenient tool for clients to book
                    appointments
                    with precise durations, streamlining the scheduling process for greater efficiency.</p>

                <a href="/account/settings/calendar/create">
                    <button class="btn variant-filled-primary">Create a new event</button>
                </a>
            </div>
        {/if}
    </div>
</div>

