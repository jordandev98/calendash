<script>
    import {settingsStore} from "../../../store/settingsStore.ts";
    import {goto} from "$app/navigation";

    let calendarSettings;

    settingsStore.subscribe(value => {
        calendarSettings = value;
    })


    const handleAddNewCalendar = () => {
        goto("/account/settings/calendar/create")
    }
</script>


<div class="flex flex-col w-11/12 py-12">
    <button class="btn variant-filled-primary" on:click={handleAddNewCalendar}>Add new appointement page</button>
    {#if calendarSettings}
        {#each calendarSettings as calendar}
            <div>
                <p>{calendar.url}</p>
                <p>{calendar.calendars.length}</p>
            </div>
        {/each}

    {/if}
</div>