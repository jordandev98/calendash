<script>
    import {settingsStore} from "../../store/settingsStore.js";

    const calendarNumber = 0;
    let calendarSettings;

    settingsStore.subscribe(value => {
        console.log(value)
        calendarSettings = value
    })
</script>

<div class="w-11/12 pt-12">
    {#if calendarSettings.url}
        <p>My calendar</p>
        <div class="bg-gray-100 p-4">
            <a class="text-blue-600 dark:text-blue-500 hover:underline"
               href={`${import.meta.env.VITE_BASE_URL}/${calendarSettings.url}`}>{calendarSettings.url ? import.meta.env.VITE_BASE_URL + "/" + calendarSettings.url : "" }</a>
        </div>
        {:else}
        <div class="flex flex-col p-4 bg-gray-100">
            <p>No calendar set yet</p>
            <button >Create your calendar page</button>
        </div>
    {/if}
</div>