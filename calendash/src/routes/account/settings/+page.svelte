<script>
    import {goto} from "$app/navigation";
    import {authStore} from "../../../store/store.js";
    import {Avatar} from "@skeletonlabs/skeleton";

    export let data;

    const page = data.page;

    const handleAddNewCalendar = () => {
        if (page.calendars.length === 0) {
            goto("/account/settings/calendar/create")
        }

    }

    if (!page)
        handleAddNewCalendar()


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

    {#if $authStore.user.subscriptions.length >= page.calendars.length }
        <a href="/account/settings/calendar/create">
            <button class="btn variant-filled-primary" on:click={handleAddNewCalendar}>Add calendar</button>
        </a>
    {/if}
    <h2 class="text-2xl font-semibold">My calendars</h2>

    {#if page}
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">


            <div class="bg-gray-50 p-8 rounded-xl border hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-md">
                {#each page.calendars as calendar , i}
                    <a href={`/account/settings/calendar/edit/${calendar._id}`}>
                        <div class="flex flex-col gap-4 ">
                            <div class="flex items-center justify-between pb-4 border-b">
                                <p class="text-xl font-semibold">{calendar.name}</p>
                                <Avatar src={import.meta.env.VITE_AWS_BASE_URL+calendar.img}></Avatar>
                            </div>

                            <div class="flex flex-col gap-2 ">
                                {#each Object.keys(sortScheduleByDay(calendar.schedule)) as day }
                                    <div class="flex justify-between">
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
                            <!--                        <button class="btn variant-glass-surface">Share with calendash user</button>-->
                        </div>

                    </a>
                {/each}
            </div>
        </div>
    {/if}
</div>