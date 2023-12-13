<script lang="ts">
    import {Step, Stepper} from "@skeletonlabs/skeleton";
    import {settingsStore} from "../../../../../store/settingsStore";
    import Schedule from "$lib/settings/Schedule.svelte";
    import type {CalendarEntry} from "../../../../../data/userCalendar";
    import {authStore} from "../../../../../store/store"

    let currentCalendar: CalendarEntry;
    let currentUserCalendars : CalendarEntry[]
    export let data;

    const token_id: string = data.token_id

    authStore.subscribe(value => {
        currentUserCalendars = value.user.calendars
    })

    settingsStore.subscribe(value => {
        currentCalendar = value
        const lastIndexUserCalendars = currentUserCalendars.length -1
        currentCalendar._id = currentUserCalendars[lastIndexUserCalendars]._id;
        currentCalendar.calendarId = currentUserCalendars[lastIndexUserCalendars].calendarId;
    })

    const handleComplete = async () => {
        const res =  await fetch(`${import.meta.env.VITE_API_URL}/calendar/${currentCalendar._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_id}`
            },
            body: JSON.stringify(
                currentCalendar
            )
        });
        if (res.status < 300) {
            const data = await res.json();
            authStore.update(value => {
                const currentUser = { ...value.user };
                const calendars = [...currentUser.calendars]; // Create a copy of the calendars array
                const lastIndex = calendars.length - 1;

                if (lastIndex >= 0) {
                    calendars[lastIndex] = data.newCalendar; // Set the last calendar to the updated data
                    currentUser.calendars = calendars;
                }

                return { ...value, user: currentUser };
            });
        }
    }


</script>

<div class="w-11/12 max-w-lg pt-12">
    {#if currentCalendar}
        <Stepper on:complete={handleComplete}>
            <Step locked={!currentCalendar.name}>
                <svelte:fragment slot="header"><p>Choose a name!</p></svelte:fragment>
                <div class="flex flex-col gap-8">
                    <p>This is the name your clients will see when selecting a calendar.</p>
                    <div class="flex flex-col ">
                        <span class="font-semibold">Calendar name</span>
                        <input class={"input rounded-sm "} bind:value={currentCalendar.name}/>
                    </div>
                </div>

            </Step>
            <Step locked={!currentCalendar.isValid}>
                <svelte:fragment slot="header">Customize your schedule</svelte:fragment>
                <Schedule/>
            </Step>
        </Stepper>

    {/if}
</div>