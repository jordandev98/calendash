<script>
    import {Step, Stepper} from "@skeletonlabs/skeleton";
    import Schedule from "$lib/settings/Schedule.svelte";
    import {settingsStore} from "../../../store/settingsStore.js";


    let calendarSettings;

    settingsStore.subscribe(value => {

        calendarSettings = value;
    })
    const handleComplete = () => {
        console.log(calendarSettings)
    }
</script>

<div class="w-11/12 max-w-lg self-center">

    <Stepper on:complete={handleComplete}>
        <Step locked={!calendarSettings.url}>
            <svelte:fragment slot="header"><p>Welcome to Calendash!</p></svelte:fragment>
            <div class="flex flex-col gap-8">
                <p>Let's walk through the configuration together, ensuring your preferences and needs are seamlessly
                    integrated. Sit back, relax, and let's tailor this platform to suit you perfectly.</p>
                <div class="flex flex-col gap-4">
                    <p class="text-xl font-bold"> Create your link</p>
                    <p>Pick a URL that's easy for your clients to remember and share for booking appointments. Make it
                        short, descriptive, and memorable!</p>
                    <div class="flex justify-center items-center">
                        <p class="font-bold">calendash.com/</p><input class={"input rounded-sm "}
                                                                      bind:value={calendarSettings.url}/>
                    </div>

                </div>
            </div>

        </Step>
        <Step locked={!calendarSettings.calendars[0].isValid}>
            <svelte:fragment slot="header">Set you availability</svelte:fragment>
            {calendarSettings.calendars[0].isValid}
            <Schedule/>
        </Step>
        <!-- ... -->
    </Stepper>


</div>