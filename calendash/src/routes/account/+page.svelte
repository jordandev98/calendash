<script>
    import {Accordion, AccordionItem, clipboard, Toast} from "@skeletonlabs/skeleton";
    import {goto} from "$app/navigation";
    import Icon from "@iconify/svelte";
    import AccountEvents from "$lib/settings/AccountEvents.svelte";
    import CalendashContainer from "$lib/CalendashContainer.svelte";

    let copyState = false;

    export let data;
    const page = data.page
    console.log(page)

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

<div class="flex flex-col w-11/12 pt-12 gap-4">
    {#if data && data.page}
        <div class="p-8 border rounded-xl bg-gray-50">
            <p class="text-xl font-semibold">My page</p>
            <div class="flex items-center justify-between">
                <a class="text-blue-600 dark:text-blue-500 hover:underline"
                   href={`${import.meta.env.VITE_BASE_URL}/${page.url}`}>{page.url ? import.meta.env.VITE_BASE_URL + "/" + page.url : "" }</a>

                <button class="btn variant-filled-primary"
                        use:clipboard={`${import.meta.env.VITE_BASE_URL}/${page.url}`}
                        on:click={()=> {
                           copyState = true;
                           setTimeout(()=> {
                               copyState = false;
                           } , 1000 )
                }}>
                    {#if copyState}
                        <Icon icon="noto:thumbs-up"/>
                    {:else }
                        <Icon icon="mdi:content-copy"/>
                    {/if}

                </button>
            </div>
        </div>
        <CalendashContainer>
            <div class="flex justify-between items-center">
                <p class="text-xl font-semibold">My calendars</p>
                <a href="/account/settings">
                    <button class="btn variant-glass-primary text-primary-500">Manage calendars</button>
                </a>

            </div>

            <div class="flex flex-col justify-between gap-4">
                {#if page.calendars && page.calendars.length > 0}
                    <Accordion>
                        {#each page.calendars as calendar}
                            <AccordionItem>
                                <svelte:fragment slot="summary">
                                    <div>
                                        <p class="text-lg font-semibold">{calendar.name}</p>
                                    </div>

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
                    <div class="flex flex-col gap-4 items-center">
                        <h3 class="text-xl font-semibold">Create your first calendar</h3>
                        <p class="text-center">Create your schedule, link it with Google Calendars, and start accepting
                            bookings or appointments seamlessly. </p>

                        <a href="/account/settings/calendar/create">
                            <button class="btn variant-filled-primary">Create a new calendar</button>
                        </a>
                    </div>

                {/if}
            </div>

        </CalendashContainer>

        <AccountEvents events={page.events}/>
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
    <Toast/>
</div>