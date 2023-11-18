<script>
    import Icon from "@iconify/svelte";
    import {addHours, deleteHours, settingsStore} from "../../store/settingsStore.js";
    import {checkIsCalendarValid, checkOverlap, timeOptions} from "../../service/date/TimeService.js";

    let calendarNumber = 0;
    let calendarSettings;


    settingsStore.subscribe(value => {
        calendarSettings = value;
    })


    function handleDeleteHoursByIndex(day, i) {
        deleteHours(day, i, calendarNumber)
    }

    function handleAddHour(day) {
        console.log(calendarSettings)
        addHours(day, calendarNumber)
    }

    function handleCalendar() {
        const isValid = checkIsCalendarValid(calendarSettings.calendars[calendarNumber]);

        let newCalendars = [...calendarSettings.calendars]; // Copy the calendars array

        // Update the isValid property of the specific calendar
        newCalendars[calendarNumber] = {
            ...newCalendars[calendarNumber],
            isValid: isValid,
        };

        settingsStore.set({
            ...calendarSettings,
            calendars: newCalendars,
        });

    }

</script>

<div>

    <p>Create your schedule</p>
    {#if calendarSettings}
        <div class="flex flex-col gap-1">
            {#each Object.entries(calendarSettings.calendars[calendarNumber].availability) as [day, hours]}
                <span class="font-semibold">{day}</span>
                <div class="flex justify-between">

                    <div class="flex flex-col gap-2">
                        {#each hours as hour, i}
                            <div class="flex items-center">
                                <div class="flex gap-1 items-center">
                                    <select class={"select"} bind:value={hour.start} on:change={() => handleCalendar()}>
                                        {#each timeOptions as timeOption}
                                            <option value={timeOption.value}>{timeOption.label}</option>
                                        {/each}
                                    </select>
                                    <p>-</p>
                                    <select class={"select"} bind:value={hour.end} on:change={() => handleCalendar()}>
                                        {#each timeOptions as timeOption}
                                            <option value={timeOption.value}>{timeOption.label}</option>
                                        {/each}
                                    </select>

                                </div>
                                <div>
                                    <button class="btn" on:click={() => handleDeleteHoursByIndex(day, i)}>
                                        <Icon icon="material-symbols:delete" width={20}/>
                                    </button>
                                </div>
                            </div>
                            {#if hour.start > hour.end}
                                <p class="text-error-500">Start time can't be starting after the end time</p>
                            {/if}


                        {/each}
                        {#if checkOverlap(hours)}
                            <p class="text-error-500">The time slots can't be overlapping</p>
                        {/if}
                    </div>
                    <button class="btn self-start" on:click={() => handleAddHour(day)}>
                        <Icon icon="material-symbols:add" width={20}/>
                    </button>
                </div>
            {/each}
        </div>
    {/if}

</div>