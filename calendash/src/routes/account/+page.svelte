<script>
    import {Accordion, AccordionItem, clipboard} from "@skeletonlabs/skeleton";
    import {goto} from "$app/navigation";
    import {authStore} from "../../store/store.js";

    let calendarSettings;

    authStore.subscribe(value => {
        calendarSettings = value.user
    })
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

<div class="flex flex-col w-11/12 pt-12 gap-8">
    {#if calendarSettings && calendarSettings.url}
        <p class="text-2xl font-semibold">My Account</p>

        <div class="flex flex-col gap-2 p-8 bg-gray-50">
            <p class="text-xl font-semibold">My page</p>
            <div class="flex items-center justify-between">
                <a class="text-blue-600 dark:text-blue-500 hover:underline"
                   href={`${import.meta.env.VITE_BASE_URL}/${calendarSettings.url}`}>{calendarSettings.url ? import.meta.env.VITE_BASE_URL + "/" + calendarSettings.url : "" }</a>
                <button class="btn variant-filled-primary"
                        use:clipboard={`${import.meta.env.VITE_BASE_URL}/${calendarSettings.url}`}>
                    Copy
                </button>
            </div>
        </div>
        <div>
            <div class="flex flex-col p-8 bg-gray-50 gap-4">
                <p class="text-xl font-semibold">My calendars</p>
                <div class="flex flex-col justify-between gap-4">
                    {#if calendarSettings.calendars && calendarSettings.calendars[0].name}
                        <Accordion>
                            {#each calendarSettings.calendars as calendar , i}
                                <AccordionItem>
                                    <svelte:fragment slot="summary"><p class="text-lg font-semibold">{calendar.name}</p>
                                    </svelte:fragment>
                                    <svelte:fragment slot="content">
                                        <div class="flex flex-col gap-2">
                                            {#each Object.keys(sortScheduleByDay(calendar.schedule)) as day }
                                                <div class="flex gap-2">
                                                    <span class="text-md font-semibold">{day} :</span>
                                                    {#each calendar.schedule[day] as timeEntry}
                                                        <div class="flex gap-1">
                                                            {#if timeEntry.start}
                                                                <span>{timeEntry.start} - {timeEntry.end}</span>
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
                    {:else}
                        <p>Your page doesn't have a calendar yet</p>
                        <a href="/account/settings/calendar/create">
                            <button class="btn variant-filled-primary">Configure a new calendar</button>
                        </a>

                    {/if}
                </div>

            </div>
        </div>
    {:else}
        <div class="flex flex-col p-4 bg-gray-100 items-center  gap-4">
            <div class="flex flex-col justify-center items-center w-11/12">
                <img class="aspect-square w-full md:w-1/2 max-w-md" src="/illustrations/emptyCalendarState.png"
                     alt="Empty calendar state">
                <p class="text-xl font-semibold">You don't have a page yet !</p>
            </div>
            <button on:click={()=> goto("/account/settings/calendar/page")} class="btn variant-filled-primary">
                Set up your page now !
            </button>
        </div>
    {/if}
</div>