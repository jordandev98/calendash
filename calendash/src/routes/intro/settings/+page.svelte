<script>
    import {RadioGroup, RadioItem, Step, Stepper} from "@skeletonlabs/skeleton";
    import Schedule from "$lib/settings/Schedule.svelte";


    let calendarSettings = {
        url: "",
        hoursFormat: 24,
        calendars: [
            {
                availability: {
                    "Monday": [{start: "9:00", end: "17:00"}],
                    "Tuesday": [{start: "9:00", end: "17:00"}],
                    "Wednesday": [{start: "9:00", end: "17:00"}],
                    "Thursday": [{start: "9:00", end: "17:00"}],
                    "Friday": [{start: "9:00", end: "17:00"}],
                    "Saturday": [{start: "9:00", end: "17:00"}],
                    "Sunday": [],
                },
                timezone: "Pacific/Honolulu",
            },
        ]
    }
</script>

<div class="w-11/12 max-w-lg self-center">

    <Stepper>
        <Step>
            <svelte:fragment slot="header"><p>Welcome to Calendash!</p></svelte:fragment>
            <div class="flex flex-col gap-8">
                <p>Let's walk through the configuration together, ensuring your preferences and needs are seamlessly
                    integrated. Sit back, relax, and let's tailor this platform to suit you perfectly.</p>
                <div class="flex flex-col gap-4">
                    <p class="text-xl font-bold"> Create your link</p>
                    <p>Pick a URL that's easy for your clients to remember and share for booking appointments. Make it
                        short, descriptive, and memorable!</p>
                    <div class="flex justify-center items-center">
                        <p class="font-bold">calendash.com/</p><input class="input rounded-sm "
                                                                      on:bind={calendarSettings.url}/>
                    </div>

                </div>

                <div class="flex items-center gap-4">
                    <p> Hours format :</p>
                    <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary"
                                background="bg-primary-100" border="border-none">
                        <RadioItem bind:group={calendarSettings.hoursFormat} value={12}>12 hours</RadioItem>
                        <RadioItem bind:group={calendarSettings.hoursFormat} value={24}>24 hours</RadioItem>
                    </RadioGroup>
                </div>
            </div>

        </Step>
        <Step>
            <svelte:fragment slot="header">Set you availability</svelte:fragment>
            <Schedule/>
        </Step>
        <!-- ... -->
    </Stepper>


</div>