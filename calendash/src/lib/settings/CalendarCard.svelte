<script>
    import {Avatar} from "@skeletonlabs/skeleton";

    export let page;


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

{#if page}
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {#each page.calendars as calendar , i}

            <div class="bg-gray-50 p-8 rounded-xl border hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-md">
                <a href={`/account/settings/calendar/edit/${calendar._id}`}>
                    <div class="flex flex-col gap-4 ">
                        <div class="flex items-center justify-between pb-4 border-b">
                            <p class="text-xl font-semibold">{calendar.name}</p>
                            <Avatar src={import.meta.env.VITE_AWS_BASE_URL+calendar.img}></Avatar>
                        </div>

                        <div class="flex flex-col gap-2 ">
                            {#each Object.keys(sortScheduleByDay(calendar.schedule)) as day }
                                <div class="flex justify-between ">
                                    <p class="font-semibold">{day}</p>
                                    <div class="flex flex-col">
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

                                </div>
                            {/each}
                        </div>
                        <!--                        <button class="btn variant-glass-surface">Share with calendash user</button>-->
                    </div>

                </a>

            </div>
        {/each}
    </div>
{/if}