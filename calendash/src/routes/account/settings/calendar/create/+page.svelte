<script lang="ts">
    import {ListBox, ListBoxItem, ProgressRadial, Step, Stepper} from "@skeletonlabs/skeleton";
    import {settingsStore} from "../../../../../store/settingsStore";
    import type {CalendarEntry} from "../../../../../data/userCalendar";
    import {enhance} from "$app/forms";
    import Schedule from "$lib/settings/Schedule.svelte";
    import {goto} from "$app/navigation";
    import {langStrings} from "../../../../../text/langText"
    import {langStore} from "../../../../../store/langStore"

    let currentCalendar: CalendarEntry;
    export let data;

    let newGoogleCalendarName = "";

    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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
        <Stepper on:complete={handleComplete} stepTerm={langStrings[$langStore]["step"]}
                 buttonNextLabel={langStrings[$langStore]["next"]}
                 buttonBackLabel={langStrings[$langStore]["back"]}
                 buttonCompleteLabel={langStrings[$langStore]["complete"]}>
            <Step locked={!$settingsStore.calendarId}>
                <svelte:fragment slot="header"><p
                        class="text-4xl">{langStrings[$langStore]["pageCalendarCreateTitle"]}</p>
                </svelte:fragment>
                <div class="flex flex-col bg-gray-50 p-4 rounded-xl gap-4">
                    <p>{langStrings[$langStore]["pageCalendarCreateDescription"]}</p>

                    <p class="text-xl font-semibold">{langStrings[$langStore]["pageCalendarCreateSubtitle"]}</p>
                    {#if data.calendars && data.calendars.length > 0}
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
                        <span class="flex-shrink mx-4 text-gray-500">{langStrings[$langStore]["or"]}</span>
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

                        <p class="font-semibold text-xl">{langStrings[$langStore]["pageCalendarCreateGoogleTitle"]}</p>
                        <div class="flex items-center gap-4">
                            <p>{langStrings[$langStore]["timezoneLabel"]}</p>
                            <select name="timeZone" class="rounded border" bind:value={timeZone}>
                                <option>{Intl.DateTimeFormat().resolvedOptions().timeZone}</option>
                                {#each Intl.supportedValuesOf('timeZone') as tz}
                                    <option>{tz}</option>
                                {/each}
                            </select>
                        </div>
                        <label class="flex flex-col">
                            <span>{langStrings[$langStore]["calendarNameLabel"]}</span>

                            <input class="rounded-xl bg-gray-50 border border-gray-400" name="summary"
                                   bind:value={newGoogleCalendarName}/>
                        </label>
                        {#if isLoading}
                            <button class="btn variant-filled-primary pointer-events-none">
                                <ProgressRadial width="w-6"/>
                            </button>
                        {:else}
                            <button type="submit" class="btn variant-filled-primary" disabled={!newGoogleCalendarName}>
                                {langStrings[$langStore]["addNewGoogleCalendar"]}
                            </button>
                        {/if}

                    </form>

                </div>
            </Step>
            <Step locked={!currentCalendar.name}>
                <svelte:fragment slot="header"><p>{langStrings[$langStore]["chooseCalendarNameTile"]}</p></svelte:fragment>
                <div class="flex flex-col gap-8">
                    <p>{langStrings[$langStore]["chooseCalendarNameDescription"]}</p>
                    <div class="flex flex-col ">
                        <span class="font-semibold">{langStrings[$langStore]["calendarNameLabel"]}</span>
                        <input class={"rounded "} bind:value={currentCalendar.name}/>
                    </div>
                </div>

            </Step>
            <Step locked={!currentCalendar.isValid}>
                <svelte:fragment slot="header">{langStrings[$langStore]["customizeScheduleTitle"]}</svelte:fragment>
                <Schedule/>
            </Step>
        </Stepper>

    {/if}
</div>