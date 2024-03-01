<script>
    export let calendar;

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