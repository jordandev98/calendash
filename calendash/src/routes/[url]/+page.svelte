<script>
    import {formatDuration} from "../../service/date/TimeService.js";
    import Icon from "@iconify/svelte";
    import {onMount} from "svelte";

    export let data;

    let calendarNumber = 0
    const calendars = data.calendar[calendarNumber].settings
    console.log(calendars)

    let selectedEvent;
    let freeTimes = []

    const fetchFreeTimes = async () => {
        try {
            const calendarBody = calendars.calendars[calendarNumber]
            const res = await fetch(`${import.meta.env.VITE_API_URL}/calendar/event/timeslots/oo.jordanlee@gmail.com`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    timeZone: calendarBody.timezone,
                    workingHours: calendarBody.availability
                })
            });
            if (!res.ok) { // res.ok checks if the HTTP response status is 200-299
                return
            }
            // This line parses the response as JSON
            return await res.json();
        } catch (error) {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
        }
    }

    onMount(async () => {
        // Fetch the busy times and working hours from your API
        freeTimes = await fetchFreeTimes();
        console.log(freeTimes)
    });
</script>


<div class="flex flex-col w-11/12 self-center gap-4 pt-12">
    <p>1- Select an appointement type</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each calendars.calendars[calendarNumber].events as event}
            <button class="btn flex flex-col items-start bg-gray-50 p-4 gap-2 rounded bg-">
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