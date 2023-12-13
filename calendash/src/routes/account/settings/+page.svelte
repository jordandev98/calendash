<script>
    import {goto} from "$app/navigation";
    import {Accordion, AccordionItem, clipboard} from "@skeletonlabs/skeleton";
    import {authStore} from "../../../store/store.js";

    let calendarSettings;

    authStore.subscribe(value => {
        calendarSettings = value.user;
    })


    const handleAddNewCalendar = () => {
        goto("/account/settings/calendar/create")
    }

    // Sort the keys of the schedule object based on the week order
    function sortScheduleByDay(scheduleObj) {
        const dayOrder = {
            "Monday": 1,
            "Tuesday": 2,
            "Wednesday": 3,
            "Thursday": 4,
            "Friday": 5,
            "Saturday": 6,
            "Sunday": 7
        };

        return Object.entries(scheduleObj)
            .sort(([dayA], [dayB]) => dayOrder[dayA] - dayOrder[dayB])
            .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});
    }
</script>


<div class="flex flex-col w-11/12 py-12 gap-8">
    <button class="btn variant-filled-primary" on:click={handleAddNewCalendar}>Add calendar</button>

    {#if calendarSettings}
        <h2 class="text-xl font-semibold">My page</h2>
        <div class="flex items-center justify-between bg-gray-50 p-4 ">
            <a class="text-surface-500 dark:text-blue-500 hover:underline"
               href={`${import.meta.env.VITE_BASE_URL}/${calendarSettings.url}`}>{calendarSettings.url ? import.meta.env.VITE_BASE_URL + "/" + calendarSettings.url : "" }</a>
            <button class="btn variant-filled-primary"
                    use:clipboard={`${import.meta.env.VITE_BASE_URL}/${calendarSettings.url}`}>
                Copy
            </button>
        </div>


        <h2 class="text-xl font-semibold">My calendars</h2>

        <div class="bg-gray-50 p-4">
            <Accordion>
                {#each calendarSettings.calendars as calendar , i}
                    <AccordionItem open={i ===0}>
                        <svelte:fragment slot="summary"><p class="text-lg font-semibold">{calendar.name}</p>
                        </svelte:fragment>
                        <svelte:fragment slot="content">
                            <div class="flex flex-col gap-2">
                                {#each Object.keys(sortScheduleByDay(calendar.schedule)) as day }
                                    <div>
                                        <p class="font-semibold">{day}</p>
                                        {#each calendar.schedule[day] as timeEntry}
                                            <div class="flex gap-1">
                                                {#if timeEntry.start}
                                                    <p>{timeEntry.start} - {timeEntry.end}</p>
                                                {:else}
                                                    <p>Closed</p>
                                                {/if}
                                            </div>
                                        {/each}
                                    </div>
                                {/each}
                            </div>
                        </svelte:fragment>
                    </AccordionItem>
                {/each}
            </Accordion>
        </div>

    {/if}
</div>