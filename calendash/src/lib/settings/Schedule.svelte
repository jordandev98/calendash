<script>
    import Icon from "@iconify/svelte";
    import {addHours, deleteHours, settingsStore} from "../../store/settingsStore.js";

    let calendarNumber = 0;
    let calendarSettings;

    settingsStore.subscribe(value => {

        calendarSettings = value;
    })


    function handleDeleteHoursByIndex(day, i) {
        deleteHours(day, i , calendarNumber)
    }

    function handleAddHour(day) {
        addHours(day , calendarNumber)
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
                                <input class="input p-1 rounded-md w-24" bind:value={hour.start} type="text"/>
                                <p>-</p>
                                <input class="input p-1 rounded-md w-24" bind:value={hour.end} type="text"/>
                            </div>
                            <div>
                                <button class="btn" on:click={() => handleDeleteHoursByIndex(day, i)}>
                                    <Icon icon="material-symbols:delete" width={20}/>
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
                    <button class="btn" on:click={() => handleAddHour(day)}>
                        <Icon icon="material-symbols:add" width={20}/>
                    </button>
                </div>
            {/each}
        </div>
    {/if}
</div>