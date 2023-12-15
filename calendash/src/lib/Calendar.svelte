<script>
    import {
        add,
        addMinutes,
        eachDayOfInterval,
        endOfMonth,
        format,
        getDay,
        isAfter,
        isEqual,
        isSameMonth,
        isToday,
        parse,
        startOfToday,
    } from 'date-fns';
    import Icon from "@iconify/svelte";
    import {payloadStore} from "../store/payloadStore.js";
    import {onMount} from "svelte";
    import {ProgressRadial} from "@skeletonlabs/skeleton";

    export let user
    let freeTimes;
    let currentEvent;
    let isLoading = true;

    payloadStore.subscribe(value => {
        currentEvent = value;
    })

    const fetchFreeTimes = async () => {
        try {
            const calendarBody = user.calendars.find(calendar => calendar.calendarId === currentEvent.calendarId)
            const res = await fetch(`${import.meta.env.VITE_API_URL}/calendar/event/timeslots/${currentEvent.calendarId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    timeZone: calendarBody.timezone,
                    workingHours: calendarBody.schedule
                })
            });
            if (!res.ok) { // res.ok checks if the HTTP response status is 200-299
                return
            }
            // This line parses the response as JSON
            return await res.json();
        } catch (error) {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
        }
    }

    let colStartClasses = [
        '',
        'col-start-2',
        'col-start-3',
        'col-start-4',
        'col-start-5',
        'col-start-6',
        'col-start-7',
    ];

    let today = startOfToday();
    let selectedDay = today;
    let currentMonth = format(today, 'MMM-yyyy');
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

    let days = [];

    function updateDays() {
        days = eachDayOfInterval({
            start: firstDayCurrentMonth,
            end: endOfMonth(firstDayCurrentMonth),
        });
    }

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, {months: -1});
        currentMonth = format(firstDayNextMonth, 'MMM-yyyy');
        firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
        updateDays();
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, {months: 1});
        currentMonth = format(firstDayNextMonth, 'MMM-yyyy');
        firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
        updateDays();
    }

    function generateTimeSlots(slot) {
        const timeSlots = [];
        const roundedDuration = roundDurationToNearest15(currentEvent.duration);

        let currentTime = new Date(slot.start);
        let currentEndDate = new Date(slot.end);

        while (addMinutes(new Date(currentTime), roundedDuration) <= currentEndDate) {
            timeSlots.push({
                start: new Date(currentTime),
                end: addMinutes(new Date(currentTime), roundedDuration)
            });
            currentTime = addMinutes(currentTime, roundedDuration);
        }

        return timeSlots;
    }

    function roundDurationToNearest15(duration) {
        const quarterHour = 15;
        return Math.round(duration / quarterHour) * quarterHour;
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    function isTimeSlotAvailable(day) {
        const dateFormat = 'yyyy-MM-dd';
        const formattedDay = format(day, dateFormat);

        const dayFreeTimes = freeTimes[formattedDay];
        const isDayAvailable = dayFreeTimes && dayFreeTimes.length > 0;

        return isDayAvailable && isEventAvailable(dayFreeTimes);
    }

    function isEventAvailable (timeSlot) {
        if (timeSlot.length > 1) {
            return true
        }
        let start = parse(timeSlot[0].start , "MM/dd/yyyy HH:mm" , new Date());
        const end =  parse(timeSlot[0].end , "MM/dd/yyyy HH:mm" , new Date());
        start = addMinutes(start , currentEvent.duration)
        return isAfter(end , start)
    }

    const handleSelectSlot = (slot) => {
        let eventStartTime = slot.start;
        let newEventStore = {
            ...currentEvent,
            payload: {
                ...currentEvent.payload,
                start: {
                    dateTime: eventStartTime
                },
                end: {
                    dateTime: addMinutes(eventStartTime, currentEvent.duration)
                }
            }
        };
        payloadStore.set(newEventStore);
    }

    updateDays();

    onMount(async () => {
        isLoading = true;
        freeTimes = await fetchFreeTimes()
        console.log(freeTimes)
        isLoading = false;
    })
</script>

<div class="bg-gray-50 p-8 w-full ">
    <div class="grid md:grid-cols-2 md:divide-x md:divide-gray-200 gap-4">
        <div class="max-w-lg ">
            <div class="flex items-center">
                <h2 class="flex-auto font-semibold text-gray-900">
                    {format(firstDayCurrentMonth, 'MMMM yyyy')}
                </h2>
                <button on:click={previousMonth}
                        class="-my-1.5 flex flex-none items-center justify-center p-1.5  hover:scale-110">
                    <Icon icon="mdi:chevron-left"/>
                </button>
                <button on:click={nextMonth}
                        class="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 hover:scale-110">
                    <Icon icon="mdi:chevron-right"/>
                </button>
            </div>
            <div class="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
            </div>
            <div class="grid grid-cols-7 mt-2 text-sm">
                {#each days as day, dayIdx}
                    <div class={classNames(dayIdx === 0 && colStartClasses[getDay(day)],'py-1.5')}>

                        {#if freeTimes && isTimeSlotAvailable(day) }
                            <button type="button" on:click={() => selectedDay = (day)} class={classNames(
                                          isEqual(day, selectedDay) && 'text-white',
                                          !isEqual(day, selectedDay) && isToday(day) && 'text-primary-500',
                                          !isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            isSameMonth(day, firstDayCurrentMonth) &&
                                            'text-gray-900',
                                          !isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            !isSameMonth(day, firstDayCurrentMonth) &&
                                            'text-gray-400',
                                          isEqual(day, selectedDay) && isToday(day) && 'bg-primary-500',
                                          isEqual(day, selectedDay) && !isToday(day) && 'bg-surface-900',
                                          !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                          (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
                                          'mx-auto flex h-8 w-8 items-center justify-center rounded-full')}>
                                <time datetime={format(day, 'yyyy-MM-dd')}>
                                    {format(day, 'd')}
                                </time>
                            </button>
                        {:else}
                            <button class="mx-auto flex h-8 w-8 items-center justify-center rounded-full text-gray-400"
                                    disabled>
                                <time datetime={format(day, 'yyyy-MM-dd')}>
                                    {format(day, 'd')}
                                </time>
                            </button>
                        {/if}
                    </div>
                {/each}
            </div>

        </div>

        <div class={"flex flex-col justify-between md:pl-8 w-full gap-8"}>
            {#if isLoading}
                <div class="flex flex-1 items-center justify-center">
                    <ProgressRadial width="w-20"/>
                </div>
            {/if}
            {#if freeTimes}


                <div class="grid grid-cols-1 gap-4">
                    <h2 class="font-semibold text-gray-900">
                        <time datetime={format(selectedDay, 'yyyy-MM-dd')}>{format(selectedDay, 'MMM dd, yyyy')}</time>
                    </h2>
                    <div class="flex gap-4 flex-wrap">
                        {#each freeTimes[format(selectedDay, 'yyyy-MM-dd')] as timeSlot}

                            {#each generateTimeSlots(timeSlot) as slots}
                                {#if isAfter(slots.start , new Date())}

                                    {#if isEqual(currentEvent.payload.start.dateTime, slots.start) }
                                        <button class="btn variant-filled-surface rounded">{format(slots.start, 'HH:mm')}</button>
                                    {:else}
                                        <button class="btn variant-glass-surface rounded"
                                                on:click={() => handleSelectSlot(slots)}>{format(slots.start, 'HH:mm')}</button>
                                    {/if}
                                {/if   }
                            {/each}
                        {/each}
                    </div>

                </div>
            {/if}

        </div>
    </div>
</div>

