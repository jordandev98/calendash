<script lang="ts">
    import {Step, Stepper} from "@skeletonlabs/skeleton";
    import {settingsStore, updateCalendarId} from "../../../../../store/settingsStore";
    import {saveUserCalendar} from "../../../../../service/firebase/settings.ts"
    import Schedule from "$lib/settings/Schedule.svelte";
    import type {UserCalendar} from "../../../../../data/userCalendar";
    import {auth} from "../../../../../service/firebase/firebase";

    let currentCalendar: UserCalendar;

    settingsStore.subscribe(value => {
        currentCalendar = value
    })


    const calendarNumber: number = $settingsStore.calendars.length - 1

    const updateDefaultCalendar = async () => {
        const calendarId = auth.currentUser.email
        updateCalendarId(calendarNumber, calendarId)

    }

    const handleComplete = async () => {

        await updateDefaultCalendar()
        await saveUserCalendar($settingsStore)
    }
</script>

<div class="w-11/12 max-w-lg pt-12">
    {#if currentCalendar}
        <Stepper on:complete={handleComplete}>
            <Step locked={!currentCalendar.url}>
                <svelte:fragment slot="header"><p>Welcome to Calendash!</p></svelte:fragment>
                <div class="flex flex-col gap-8">
                    <p>Let's walk through the configuration together, ensuring your preferences and needs are seamlessly
                        integrated. Sit back, relax, and let's tailor this platform to suit you perfectly.</p>
                    <div class="flex flex-col gap-4">
                        <p class="text-xl font-bold"> Create your link</p>
                        <p>Pick a URL that's easy for your clients to remember and share for booking appointments. Make
                            it
                            short, descriptive, and memorable!</p>
                        <div class="flex justify-center items-center">
                            <p class="font-bold">calendash.com/</p><input class={"input rounded-sm "}
                                                                          bind:value={currentCalendar.url}/>
                        </div>

                    </div>
                </div>

            </Step>
            <Step locked={!currentCalendar.calendars[calendarNumber].name}>
                <svelte:fragment slot="header"><p>Choose a name!</p></svelte:fragment>
                <div class="flex flex-col gap-8">
                    <p>This is the name your clients will see when selecting a calendar.</p>
                    <div class="flex flex-col ">
                        <span class="font-semibold">Calendar name</span>
                        <input class={"input rounded-sm "} bind:value={currentCalendar.calendars[calendarNumber].name}/>
                    </div>
                </div>

            </Step>
            <Step locked={!currentCalendar.calendars[calendarNumber].isValid}>
                <svelte:fragment slot="header">Create you schedule</svelte:fragment>
                <Schedule/>
            </Step>
            <!-- ... -->
        </Stepper>

    {/if}
</div>