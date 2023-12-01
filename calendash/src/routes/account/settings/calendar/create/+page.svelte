<script lang="ts">
    import {Step, Stepper} from "@skeletonlabs/skeleton";
    import {initialUserData, settingsStore} from "../../../../../store/settingsStore";
    import {saveSettings} from "../../../../../service/firebase/settings.js"
    import Schedule from "$lib/settings/Schedule.svelte";

    let currentCalendar = initialUserData

    const pageNumber: number = $settingsStore.length -1

    const handleComplete = () => {
        saveSettings(currentCalendar)
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
            <Step locked={!currentCalendar.calendars[0].isValid}>
                <svelte:fragment slot="header">Set you availability</svelte:fragment>
                {currentCalendar.calendars[0].isValid}
                <Schedule {pageNumber} />
            </Step>
            <!-- ... -->
        </Stepper>

    {/if}
</div>