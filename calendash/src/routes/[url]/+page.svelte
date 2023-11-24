<script>
    import {formatDuration} from "../../service/date/TimeService.js";
    import Icon from "@iconify/svelte";

    export let data;

    let calendarNumber = 0
    const calendars = data.calendar[calendarNumber].settings
    console.log(calendars);

</script>


<div class="flex flex-col w-11/12 self-center gap-4 pt-12">
    <p>1- Select an appointement type</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each calendars.calendars[calendarNumber].events as event}
            <button class="btn flex flex-col items-start bg-gray-100 p-4 gap-2 rounded ">
                <span class="text-xl font-semibold">{event.name}</span>
                {#if event.duration}
                    <span class="flex items-center gap-1"><Icon icon="mdi:clock-outline"
                                                                width="20"/> {formatDuration(event.duration)}</span>
                {/if}

                {#if event.location}
                    <span class="flex items-center gap-1"><Icon icon="mdi:map-marker-outline"
                                                                width="20"/> {event.location}</span>
                {/if}
            </button>
        {/each}
    </div>

</div>