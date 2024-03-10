<script>
    import {payloadStore} from "../../store/payloadStore.js";
    import {Avatar, Step, Stepper} from "@skeletonlabs/skeleton";
    import Icon from "@iconify/svelte";
    import {formatEventDuration} from "../../service/date/TimeService.ts";
    import Calendar from "$lib/Calendar.svelte";
    import {goto} from "$app/navigation";
    import {format} from "date-fns";
    import {langStrings} from "../../text/langText.js";
    import {langStore} from "../../store/langStore.js";

    export let data;

    const page = data.page

    let currentEvent

    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    payloadStore.subscribe(value => {
        currentEvent = value;
    })


    const setSelectedEvent = (eventSelected) => {
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


    <Stepper on:complete={handleComplete} stepTerm={langStrings[$langStore]["step"]}
             buttonNextLabel={langStrings[$langStore]["next"]}
             buttonBackLabel={langStrings[$langStore]["back"]}
             buttonCompleteLabel={langStrings[$langStore]["complete"]}>
        <Step locked={!currentEvent.calendarId}>
            <svelte:fragment slot="header">{langStrings[$langStore]["chooseBookingOption"]}</svelte:fragment>
            <div class="flex items-center gap-4">
                <p>{langStrings[$langStore]["timezoneLabel"]}</p>
                <select class="rounded border" bind:value={timezone}>
                    <option>{Intl.DateTimeFormat().resolvedOptions().timeZone}</option>
                    {#each Intl.supportedValuesOf('timeZone') as tz}
                        <option>{tz}</option>
                    {/each}
                </select>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {#each page.calendars as calendar}
                    {#if calendar.isActive}
                        <button class={calendar.calendarId === currentEvent.calendarId ? "flex bg-gray-200 items-center gap-8 p-8  rounded border"
                    : "flex items-center p-8 border gap-8 rounded bg-gray-50 hover:cursor-pointer hover:shadow-md"}
                                on:click={()=> {currentEvent.calendarId = calendar.calendarId; currentEvent.img = calendar.img; currentEvent.name = calendar.name}}>
                            <Avatar src={import.meta.env.VITE_AWS_BASE_URL+calendar.img} initials={calendar.name}/>
                            <span class="text-2xl font-semibold">{calendar.name}</span>

                        </button>
                    {/if}
                {/each}
            </div>
        </Step>
        <Step locked={!currentEvent.payload.summary}>
            <svelte:fragment slot="header">{langStrings[$langStore]["chooseEvent"]}</svelte:fragment>
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {#each page.events as event , i}
                    <button class={currentEvent.payload.summary === event.name ? "flex flex-col bg-gray-200 gap-2  px-8 py-4 border rounded"
                    : "flex flex-col px-8 py-4 border gap-2 rounded bg-gray-50  hover:cursor-pointer" }
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
            <svelte:fragment slot="header">{langStrings[$langStore]["chooseTimeSlot"]}</svelte:fragment>
            <div class="flex flex-col gap-4 p-4">
                <div class="flex gap-2">
                    <Avatar src={import.meta.env.VITE_AWS_BASE_URL+currentEvent.img}/>
                    <div class="flex flex-col gap-2">
                        <p class="text-2xl font-semibold">{currentEvent.name}</p>
                        <div>
                            <span class="chip bg-gray-200 w-fit">{currentEvent.payload.summary}</span>
                            <span class="chip bg-gray-200 w-fit">{formatEventDuration(currentEvent.duration)}</span>
                        </div>

                    </div>

                </div>
                <Calendar calendars={page.calendars} timeZone={timezone}/>
            </div>
        </Step>
        <Step locked={!currentEvent.payload.organizer.email || !currentEvent.payload.organizer.displayName}>
            <svelte:fragment slot="header">{langStrings[$langStore]["fillContact"]}</svelte:fragment>
            <div class="flex justify-center w-full">
                <div class="grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full">
                    <form class="flex flex-col gap-6 p-8 bg-gray-50 w-full">
                        <p class="text-lg font-semibold">{langStrings[$langStore]["contactInformation"]}</p>
                        <label class="flex flex-col">
                            <span class="text-sm font-semibold">{langStrings[$langStore]["emailLabel"]}*</span>
                            <input class="input bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded focus:border-surface-600"
                                   type="email" bind:value={currentEvent.payload.organizer.email}/>
                        </label>
                        <label class="flex flex-col">
                            <span class="text-sm font-semibold">{langStrings[$langStore]["nameLabel"]}*</span>
                            <input class="input bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded focus:border-surface-600"
                                   type="text" bind:value={currentEvent.payload.organizer.displayName}/>
                        </label>
                        <label class="flex flex-col">
                            <span class="text-sm font-semibold">{langStrings[$langStore]["complementaryInformation"]}</span>
                            <textarea
                                    class="textarea bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded focus:border-surface-600"
                                    bind:value={currentEvent.payload.description}></textarea>
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