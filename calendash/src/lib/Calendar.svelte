<script>
    import {
        add,
        eachDayOfInterval,
        endOfMonth,
        format,
        getDay,
        isEqual,
        isSameDay,
        isSameMonth,
        isToday,
        parse,
        parseISO,
        startOfToday,
    } from 'date-fns';
    import Icon from "@iconify/svelte";

    const meetings = [
        // ... meetings data ...
    ];

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

    let selectedDayMeetings = meetings.filter((meeting) =>
        isSameDay(parseISO(meeting.startDatetime), selectedDay)
    );

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    updateDays();
</script>

{currentMonth}
<!-- Rest of your HTML structure -->

{currentMonth}
<div class="pt-16">
    <div class="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div class="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
            <div class="md:pr-14">
                <div class="flex items-center">
                    <h2 class="flex-auto font-semibold text-gray-900">
                        {format(firstDayCurrentMonth, 'MMMM yyyy')}
                    </h2>
                    <button on:click={previousMonth}
                            class="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                        <Icon icon="mdi:chevron-left" />
                    </button>
                    <button on:click={nextMonth}
                            class="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                        <Icon icon="mdi:chevron-right" />
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

                            <div class="w-1 h-1 mx-auto mt-1">
                                {#if meetings.some((meeting) => isSameDay(parseISO(meeting.startDatetime), day))}
                                    <div class="w-1 h-1 rounded-full bg-sky-500"></div>
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>

            </div>
        </div>
        <section class="mt-12 md:mt-0 md:pl-14">
            <h2 class="font-semibold text-gray-900">
                Schedule for
                <time datetime={format(selectedDay, 'yyyy-MM-dd')}>{format(selectedDay, 'MMM dd, yyyy')}</time>
            </h2>
            <ol class="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                {#if selectedDayMeetings.length > 0}
                    {#each selectedDayMeetings as meeting (meeting.id)}
                        <p>meeting</p>
                    {/each}
                {:else}
                    <p>No meetings for today.</p>
                {/if}
            </ol>
        </section>
    </div>
</div>
