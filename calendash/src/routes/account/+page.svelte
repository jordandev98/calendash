<script>
    import {settingsStore} from "../../store/settingsStore.js";
    import {clipboard} from "@skeletonlabs/skeleton";

    const calendarNumber = 0;
    let isCopied = -1;
    let calendarSettings;

    settingsStore.subscribe(value => {
        console.log(value)
        calendarSettings = value
    })
</script>

<div class="flex flex-col w-11/12 pt-12 gap-4">
        {#if calendarSettings.url}
            <p class="text-2xl font-semibold">My Account</p>

            <div class="flex flex-col gap-2 p-4 bg-gray-50">
                <p class="text-lg font-semibold">My calendars pages</p>
                <div>
                    <a class="text-blue-600 dark:text-blue-500 hover:underline"
                       href={`${import.meta.env.VITE_BASE_URL}/${calendarSettings.url}`}>{calendarSettings.url ? import.meta.env.VITE_BASE_URL + "/" + calendarSettings.url : "" }</a>
                    <button class="btn variant-filled-primary"
                            use:clipboard={`${import.meta.env.VITE_BASE_URL}/${calendarSettings.url}`}>
                        Copy
                    </button>
                </div>

            </div>
        {:else}
            <div class="flex flex-col p-4 bg-gray-100">
                <p>No calendar set yet</p>
                <button>Create your calendar page</button>
            </div>
        {/if}
</div>