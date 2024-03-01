<script>

    import {formatEventDuration} from "../../../service/date/TimeService.ts";
    import Icon from "@iconify/svelte";
    import EventCard from "$lib/event/EventCard.svelte";

    export let data;

    const events = data.page.events;

</script>

<div class="flex flex-col gap-4  w-11/12 pt-8">
    <ol class="breadcrumb">
        <li class="crumb"><a class="anchor" href="/account">Account</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li>Events</li>
    </ol>
    <div class="flex items-center justify-between">
        <p class="text-2xl font-semibold">My events</p>
        <a href="/account/events/create">
            <button class="btn variant-filled-primary w-fit">Add a new event types</button>
        </a>
    </div>


    {#if events}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-col justify-between gap-4 w-full">
            {#each events as event}
                <EventCard {event}/>
            {/each}
        </div>
        {:else}
        <div class="flex flex-col gap-4 items-center pt-8">
            <h3 class="text-xl font-semibold">Create your first event type</h3>
            <p class="text-center">The types of events they serve as a convenient tool for clients to book appointments with precise durations, streamlining the scheduling process for greater efficiency.</p>

            <a href="/account/events/create">
                <button class="btn variant-filled-primary">Create a new event</button>
            </a>
        </div>
    {/if}


</div>
