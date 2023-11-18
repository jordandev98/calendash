<script>
    import Icon from "@iconify/svelte";
    import {addHours, deleteHours, settingsStore} from "../../store/settingsStore.js";
    import {checkOverlap, timeOptions, validateTimeFormat} from "../../service/date/TimeService.js";
    import {Autocomplete, popup} from "@skeletonlabs/skeleton";

    let calendarNumber = 0;
    let calendarSettings;
    let error = '';


    settingsStore.subscribe(value => {
        calendarSettings = value;
    })


    function handleDeleteHoursByIndex(day, i) {
        deleteHours(day, i, calendarNumber)
    }

    function handleAddHour(day) {
        addHours(day, calendarNumber)
    }

    function handleAutocompleteSelection(day, i, field, event) {
        // Retrieve the selected value from the event
        const selectedValue = event.detail.value;

        if (!validateTimeFormat(selectedValue)) {
            error = 'Invalid time format';
            console.log(error);
        } else {
            const otherField = field === 'start' ? 'end' : 'start';
            const hoursArray = calendarSettings.calendars[calendarNumber].availability[day];
            const otherValue = hoursArray[i][otherField];
            const isOverlaped = checkOverlap(field === 'start' ? selectedValue : otherValue, field === 'end' ? selectedValue : otherValue, hoursArray, i)
            console.log(isOverlaped)
            if (otherValue && isOverlaped) {
                error = 'Time overlaps';
                console.log(error);
            }
        }

        // Update the appropriate 'start' or 'end' field based on the selection
        settingsStore.update(settings => {
            const updatedCalendars = [...settings.calendars];
            updatedCalendars[calendarNumber].availability[day][i][field] = selectedValue;
            return {...settings, calendars: updatedCalendars};
        });
    }


</script>

<div>

    <p>Create your schedule</p>
    {#if calendarSettings}
        <div class="flex flex-col gap-1">
            <p>{calendarSettings.url}</p>
            {#each Object.entries(calendarSettings.calendars[calendarNumber].availability) as [day, hours]}
                <span class="font-semibold">{day}</span>
                <div class="flex justify-between">

                    <div class="flex flex-col gap-2">
                        {#each hours as hour, i}
                            <div class="flex items-center">
                                <div class="flex gap-1 items-center">
                                    <div>
                                        <input class="input p-1 rounded-md w-24" bind:value={hour.start} type="text"
                                               use:popup={{ event: 'focus-click',target: `popupAutocomplete${day}${i}`,placement: 'bottom'}}/>
                                        <div class="card rounded-md max-w-sm max-h-48 p-1 overflow-y-auto" tabindex="-1"
                                             data-popup="popupAutocomplete{day}{i}">
                                            <Autocomplete bind:input={hour.start} options={timeOptions}
                                                          allowlist={timeOptions.value}
                                                          on:selection={(event) =>handleAutocompleteSelection(day, i, 'start', event)}/>
                                        </div>
                                    </div>
                                    <p>-</p>
                                    <div>
                                        <input class="input p-1 rounded-md w-24" bind:value={hour.end} type="text"
                                               use:popup={{ event: 'focus-click',target: `popupAutocompleteEnd${day}${i}`,placement: 'bottom'}}/>
                                        <div class="card rounded-md max-w-sm max-h-48 p-1 overflow-y-auto" tabindex="-1"
                                             data-popup="popupAutocompleteEnd{day}{i}">
                                            <Autocomplete bind:input={hour.end} options={timeOptions}
                                                          allowlist={timeOptions.value}
                                                          on:selection={(event) =>handleAutocompleteSelection(day, i, 'end', event)}/>
                                        </div>
                                    </div>

                                </div>
                                <div>
                                    <button class="btn" on:click={() => handleDeleteHoursByIndex(day, i)}>
                                        <Icon icon="material-symbols:delete" width={20}/>
                                    </button>
                                </div>
                            </div>
                        {/each}
                    </div>
                    <button class="btn self-start" on:click={() => handleAddHour(day)}>
                        <Icon icon="material-symbols:add" width={20}/>
                    </button>
                </div>
            {/each}
        </div>
    {/if}

    {error}
</div>