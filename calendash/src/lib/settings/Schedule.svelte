<script lang="ts">
    import Icon from "@iconify/svelte";
    import {checkIsCalendarValid, checkOverlap, timeOptions} from "../../service/date/TimeService.js";
    import type {CalendarEntry} from "../../data/userCalendar"
    import {WeekDays} from "../../data/userCalendar"
    import {addHours, deleteHours, settingsStore, updateIsValid} from "../../store/settingsStore";
    import {langStrings} from "../../text/langText.js";
    import {langStore} from "../../store/langStore.js";

    let currentCalendar: CalendarEntry;

    settingsStore.subscribe(value => {
        currentCalendar = value
    })

    function handleDeleteHoursByIndex(day: string, i: number): void {
        const weekday = toWeekDay(day)
        deleteHours(weekday, i)
        handleCalendar()
    }

    function handleAddHour(day: string): void {
        const weekday = toWeekDay(day)
        addHours(weekday)
        handleCalendar()
    }

    function handleCalendar() {
        const isValid: boolean = checkIsCalendarValid(currentCalendar);

        updateIsValid(isValid)

    }

    function toWeekDay(dayString: string): WeekDays | undefined {
        if (Object.values(WeekDays).includes(dayString as WeekDays)) {
            return dayString as WeekDays;
        }
        return undefined;

    }

</script>

<div class="flex flex-col gap-4">

    <p>{langStrings[$langStore]["customizeScheduleParagraph1"]}</p>
    <p>{langStrings[$langStore]["customizeScheduleParagraph2"]}</p>
    {#if currentCalendar}
        <div class="flex flex-col gap-1">
            {#each Object.entries(currentCalendar.schedule) as [day, hours]}
                <span class="font-semibold">{langStrings[$langStore][day]}</span>
                <div class="flex justify-between">
                    <div class="flex flex-col gap-2">
                        {#each hours as hour, i}
                            <div class="flex items-center">
                                <div class="flex gap-1 items-center">
                                    <select  name={day+" start"} class="rounded-xl bg-gray-50 border border-gray-400" bind:value={hour.start} on:change={() => handleCalendar()}>
                                        {#each timeOptions as timeOption}
                                            <option value={timeOption.value}>{timeOption.label}</option>
                                        {/each}
                                    </select>
                                    <p>-</p>
                                    <select name={day+" end"} class="rounded-xl bg-gray-50 border border-gray-400" bind:value={hour.end} on:change={() => handleCalendar()}>
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