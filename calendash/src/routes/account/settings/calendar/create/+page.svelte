<script lang="ts">
    import {ListBox, ListBoxItem, ProgressRadial, Step, Stepper} from "@skeletonlabs/skeleton";
    import {settingsStore} from "../../../../../store/settingsStore";
    import type {CalendarEntry} from "../../../../../data/userCalendar";
    import {enhance} from "$app/forms";
    import Schedule from "$lib/settings/Schedule.svelte";
    import {goto} from "$app/navigation";

    let currentCalendar: CalendarEntry;
    export let data;

    console.log(data)

    let newGoogleCalendarName = "";

    const token_id: string = data.token_id

    settingsStore.subscribe(value => {
        currentCalendar = value
    })

    const handleComplete = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/calendar/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_id}`
            },
            body: JSON.stringify(
                currentCalendar
            )
        });
        if (res.status < 300) {
            goto("/account")
        }
    }

    let isLoading = false;

</script>

<div class="w-11/12 max-w-lg pt-12">
    {#if currentCalendar}
        <Stepper on:complete={handleComplete}>
            <Step locked={!$settingsStore.calendarId}>
                <svelte:fragment slot="header"><p class="text-4xl">Choose the calendar to use!</p>
                </svelte:fragment>
                <div class="flex flex-col bg-gray-50 p-4 rounded-xl gap-4">
                    <p>When clients book on this calendar, the system creates events here.</p>

                    <p class="text-xl font-semibold">Select a calendar from your Google Agenda</p>
                    {#if data.calendars}
                        <ListBox class="border p-2" rounded="rounded-xl">
                            {#each data.calendars as calendar}
                                <ListBoxItem bind:group={$settingsStore.calendarId} name={calendar.summary}
                                             value={calendar.id}>
                                    {calendar.summary}
                                </ListBoxItem>
                            {/each}
                        </ListBox>
                    {/if}
                </div>
                <div class="flex flex-col gap-6 pb-6">
                    <div class="relative flex py-5 items-center">
                        <div class="flex-grow border-t border-gray-400"></div>
                        <span class="flex-shrink mx-4 text-gray-500">or</span>
                        <div class="flex-grow border-t  border-gray-400"></div>
                    </div>
                    <form class="flex flex-col gap-4 p-8 border rounded-xl bg-gray-50" method="POST"
                          action="?/newGoogleCalendar"

                          use:enhance={() => {
                                isLoading = true;
                                return ({ update }) => {
                                    update().finally(async () => {
                                        isLoading = false;
                                    });
                                }
                                }}>
                        <p class="font-semibold text-xl">Create a new Google Calendar</p>
                        <label class="flex flex-col">
                            <span class="font-medium text-gray-900">Calendar name</span>
                            <input class="rounded-xl bg-gray-50 border border-gray-400" name="summary"
                                   bind:value={newGoogleCalendarName}/>
                        </label>
                        {#if isLoading}
                            <button class="btn variant-filled-primary pointer-events-none">
                                <ProgressRadial width="w-6"/>
                            </button>
                        {:else}
                            <button type="submit" class="btn variant-filled-primary" disabled={!newGoogleCalendarName}>
                                Add new calendar
                            </button>
                        {/if}

                    </form>

                </div>
            </Step>
            <Step locked={!currentCalendar.name}>
                <svelte:fragment slot="header"><p>Choose a name!</p></svelte:fragment>
                <div class="flex flex-col gap-8">
                    <p>This is the name your clients will see when selecting a calendar.</p>
                    <div class="flex flex-col ">
                        <span class="font-semibold">Calendar name</span>
                        <input class={"rounded-sm "} bind:value={currentCalendar.name}/>
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