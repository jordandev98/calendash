<script>
    import Icon from "@iconify/svelte";
    import {formatEventDuration} from "../../service/date/TimeService.ts";

    export let events;
</script>

<div class="flex flex-col items-start gap-4">
    <div class="flex items-center justify-between w-full">
        <p class="text-2xl font-semibold">My events types</p>
        <button class="btn variant-filled">Add event type</button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-col justify-between gap-4 w-full">
        {#if events}
            {#each events as event}
                <div class="flex flex-col py-4 px-8 border gap-2 rounded-xl bg-gray-50 shadow hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-md">
                    <div class="flex items-center justify-between">
                        <p class="text-xl font-bold">{event.name}</p>
                        {#if event.price}
                            <span class="h4">{event.price}</span>
                        {/if}
                    </div>

                    <div class="flex flex-row items-center gap-2">
                        <Icon icon="mdi:clock-outline" width="20"/>
                        <span>{formatEventDuration(event.duration)}</span>
                    </div>
                    <div class="flex flex-row items-center gap-2">
                        {#if event.location}
                            <Icon icon="mdi:map-marker-outline" width="20"/>
                            <span>{event.location}</span>
                        {/if}
                    </div>

                </div>

            {/each}
        {:else}
            <div class="flex flex-col gap-4 items-center">
                <h3 class="text-xl font-semibold">Create your first event type</h3>
                <p class="text-center">The types of events they serve as a convenient tool for clients to book appointments
                    with precise durations, streamlining the scheduling process for greater efficiency.</p>

                <a href="/account/settings/calendar/create">
                    <button class="btn variant-filled-primary">Create a new event</button>
                </a>
            </div>
        {/if}
    </div>
</div>

