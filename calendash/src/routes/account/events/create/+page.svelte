<script>
    import {settingsStore} from "../../../../store/settingsStore.ts";
    import {goto} from "$app/navigation";
    import Icon from "@iconify/svelte";
    import {formatDuration} from "../../../../service/date/TimeService.ts";
    import {saveUserCalendar} from "../../../../service/firebase/settings.ts";
    import {ProgressRadial} from "@skeletonlabs/skeleton";
    import {eventStore} from "../../../../store/eventStore.ts";
    import {calendarStore} from "../../../../store/calendarStore.js";

    let calendarSettings;
    let isLoading = false;

    let currentEvent;

    calendarStore.subscribe(value => {
        calendarSettings = value;
    })

    eventStore.subscribe(value => {
        currentEvent = value
    })

    const addEvent = async () => {
        isLoading = true
        const calendarIndex = 0; // Assuming you're working with the first calendar in the array
        calendarSettings.calendars[calendarIndex].events.push(currentEvent); // Push the new event to the events array
        settingsStore.set(calendarSettings); // Update the store
        isLoading = false
        goto("/account/events")
    }


</script>


<div class="flex flex-col justify-start  w-11/12 pt-8 gap-8">
    <ol class="breadcrumb">
        <li class="crumb"><a class="anchor" href="/account">Account</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a class="anchor" href="/account/events">Events</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li>Create</li>
    </ol>

    <form class="flex border rounded-md flex-col p-4 gap-6">
        <p class="text-xl font-bold">New event type</p>
        <label class="flex flex-col gap-2">
            <span class="font-semibold">Event name</span>
            <input class="rounded bg-surface-50" bind:value={currentEvent.name}/>
        </label>
        <label class="flex flex-col gap-2">
            <span class="font-semibold">Duration</span>
            <input class=" rounded bg-surface-50" type="number" bind:value={currentEvent.duration}/>
        </label>
        <label class="flex flex-col gap-2">
            <span class="font-semibold">Location</span>
            <input class=" rounded bg-surface-50" bind:value={currentEvent.location}/>
        </label>
        {#if isLoading}
            <button class="btn variant-filled-primary">
                <ProgressRadial width="w-6"/>
            </button>
        {:else}
            <button class="btn variant-filled-primary" on:click={addEvent}>Add new type event</button>
        {/if}
    </form>

    <div class="flex flex-col border p-4 gap-2">
        <p class="text-2xl font-bold">My event preview</p>
        <p class="text-xl font-bold">{currentEvent.name ? currentEvent.name : "My event name"}</p>
        <div class="flex flex-row items-center gap-2">
            <Icon icon="mdi:clock-outline" width="20"/>
            <span>{formatDuration(currentEvent.duration)}</span>
        </div>
        <div class="flex flex-row items-center gap-2">
            <Icon icon="mdi:map-marker-outline" width="20"/>
            <span>{currentEvent.location ? currentEvent.location : "My event location"}</span>
        </div>

    </div>
</div>
