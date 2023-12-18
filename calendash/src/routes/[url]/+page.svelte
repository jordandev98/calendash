<script>
    import {payloadStore} from "../../store/payloadStore.js";
    import {Step, Stepper} from "@skeletonlabs/skeleton";
    import Icon from "@iconify/svelte";
    import {formatEventDuration} from "../../service/date/TimeService.ts";
    import Calendar from "$lib/Calendar.svelte";
    import {goto} from "$app/navigation";
    import {format} from "date-fns";

    export let data;

    const user = data.calendars.user

    let currentEvent


    payloadStore.subscribe(value => {
        currentEvent = value;
    })



    const setSelectedEvent = (eventSelected) => {
        console.log(eventSelected)
        currentEvent.payload._id = eventSelected._id
        currentEvent.duration = eventSelected.duration
        currentEvent.payload.summary = eventSelected.name
        currentEvent.payload.description = eventSelected.description
        currentEvent.payload.location = eventSelected.location
    }
    const handleComplete = async () => {
        try {
            const eventBody = currentEvent.payload
            const res = await fetch(`${import.meta.env.VITE_API_URL}/appointment/${currentEvent.calendarId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventBody)
            });
            if (!res.ok) {
                return
            }
            // This line parses the response as JSON
            const data = await res.json();
            await goto(`/appointment/success/${data._id}`)
        } catch (error) {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
        }
    }
</script>


<div class="flex flex-col w-11/12 self-center gap-8 py-12">
    <Stepper on:complete={handleComplete}>
        <Step locked={!currentEvent.calendarId}>
            <svelte:fragment slot="header"><p>Welcome to Calendash!</p></svelte:fragment>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {#each user.calendars as calendar}
                    <button class={calendar.calendarId === currentEvent.calendarId ? "bg-surface-50 rounded p-8 "
                    : "bg-gray-50 rounded p-8 hover:bg-surface-50"}
                            on:click={()=> currentEvent.calendarId = calendar.calendarId}>
                        <span class="h3 font-semibold">{calendar.name}</span>
                    </button>
                {/each}
            </div>
        </Step>
        <Step locked={!currentEvent.payload.summary}>
            <svelte:fragment slot="header"><p>Welcome to Calendash!</p></svelte:fragment>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {#each user.calendars.find(calendar => calendar.calendarId === currentEvent.calendarId).events as event , i}
                    <button class={currentEvent.payload.summary === event.name ? "flex flex-col items-start bg-surface-50 p-4 gap-2 rounded"
                    : " flex flex-col items-start bg-gray-50 p-4 gap-2 rounded hover:bg-surface-50" }
                            on:click={()=> setSelectedEvent(event)}>
                        <span class="text-xl font-semibold">{event.name}</span>
                        {#if event.duration}
                                <span class="flex items-center gap-1">
                                    <Icon icon="mdi:clock-outline" width="20"/>
                                    {formatEventDuration(event.duration)}
                                </span>
                        {/if}

                        {#if event.location}
                                <span class="flex items-center gap-1"><Icon icon="mdi:map-marker-outline"
                                                                            width="20"/> {event.location}</span>
                        {/if}
                    </button>
                {/each}
            </div>
        </Step>
        <Step locked={!currentEvent.payload.start.dateTime}>
            <div>
                <Calendar user={data.calendars.user}/>
            </div>
        </Step>
        <Step locked={!currentEvent.payload.organizer.email || !currentEvent.payload.organizer.displayName}>
                        <div class="flex justify-center w-full">
                            <div class="grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full">
                                <form class="flex flex-col gap-6 p-8 bg-gray-50 w-full">
                                    <p class="text-lg font-semibold">Please fill your contact information</p>
                                    <label class="flex flex-col">
                                        <span class="text-sm font-semibold">Email*</span>
                                        <input class="input bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded focus:border-surface-600"
                                               type="text" bind:value={currentEvent.payload.organizer.email}/>
                                    </label>
                                    <label class="flex flex-col">
                                        <span class="text-sm font-semibold">Name *</span>
                                        <input class="input bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded focus:border-surface-600"
                                               type="text" bind:value={currentEvent.payload.organizer.displayName}/>
                                    </label>
                                    <label class="flex flex-col">
                                        <span class="text-sm font-semibold">Complementary informations for the meeting</span>
                                        <textarea
                                                class="textarea bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded focus:border-surface-600"
                                                type="text" bind:value={currentEvent.payload.description}/>
                                    </label>
                                </form>
                                <div class="flex flex-col py-8 px-16  gap-2 bg-gray-50 ">
                                    <div class="flex items-center justify-between">
                                        <p class="text-xl font-bold">{currentEvent.payload.summary}</p>
                                    </div>
                                    <div class="flex flex-row items-center gap-2">
                                        <Icon icon="mdi:calendar-outline" width="20"/>
                                        <span>{format(currentEvent.payload.start.dateTime, "EEE. MMM do yyyy HH:mm")}</span>
                                    </div>
                                    <div class="flex flex-row items-center gap-2">
                                        <Icon icon="mdi:clock-outline" width="20"/>
                                        <span>{formatEventDuration(currentEvent.duration)}</span>
                                    </div>
                                    <div class="flex flex-row items-center gap-2">
                                        <Icon icon="mdi:map-marker-outline" width="20"/>
                                        <span>{currentEvent.payload.location ? currentEvent.payload.location : "No location"}</span>
                                    </div>
                                    <p class="font-semibold">My contact</p>
                                    <div class="flex flex-col gap-2 ">
                                        <div class="flex flex-row items-center gap-2">
                                            <Icon icon="ic:outline-email" width="20"/>
                                            <p>{currentEvent.payload.organizer.email ? currentEvent.payload.organizer.email : "Please enter email"}</p>
                                        </div>
                                        <div class="flex flex-row items-center gap-2">
                                            <Icon icon="mdi:account-circle-outline" width="20"/>
                                            <p>{currentEvent.payload.organizer.displayName ? currentEvent.payload.organizer.displayName : "Please enter your name"}</p>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 text-gray-500">
                                        <span>{currentEvent.payload.description ? currentEvent.payload.description : ""}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
        </Step>


    </Stepper>


</div>