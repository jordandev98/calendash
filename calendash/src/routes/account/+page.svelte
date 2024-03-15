<script>
    import {clipboard, Toast} from "@skeletonlabs/skeleton";
    import Icon from "@iconify/svelte";
    import AccountEvents from "$lib/settings/AccountEvents.svelte";
    import CalendarCard from "$lib/settings/CalendarCard.svelte";
    import AccountEmptyCard from "$lib/account/AccountEmptyCard.svelte";
    import {langStrings} from "../../text/langText.js";
    import {langStore} from "../../store/langStore.js";

    let copyState = false;

    export let data;
    const page = data.page
    console.log(data)
    const token_id = data.token_id;
</script>

<div class="flex flex-col w-11/12 pt-12 gap-4">
    <div class="flex flex-col  items-start gap-8 ">
        <h2 class="text-2xl font-semibold">{langStrings[$langStore]["accountPageTitle"]}</h2>

        {#if !page || !page.url}

            <AccountEmptyCard title={langStrings[$langStore]["emptyPageCardTitle"]}
                              description={langStrings[$langStore]["emptyPageCardDescription"]}
                              .
                              link="/account/page" action={langStrings[$langStore]["emptyPageCardAction"]}/>

        {:else}
            <div class="flex items-center gap-4">
                <div class="flex gap-4 items-center">
                    <a class="text-blue-600 dark:text-blue-500 hover:underline"
                       href={`${import.meta.env.VITE_BASE_URL}/${page.url}`}>{page.url ? import.meta.env.VITE_BASE_URL + "/" + page.url : "" }</a>

                    <button class="btn variant-filled-primary"
                            use:clipboard={`${import.meta.env.VITE_BASE_URL}/${page.url}`}
                            on:click={()=> {
                           copyState = true;
                           setTimeout(()=> {
                               copyState = false;
                           } , 1000 )}}>
                        {#if copyState}
                            <Icon icon="noto:thumbs-up"/>
                        {:else }
                            <Icon icon="mdi:content-copy"/>
                        {/if}

                    </button>
                </div>

            </div>
        {/if}
        {#if data.upcomingAppointments}
            <h2 class="text-2xl font-semibold">Upcoming appointments</h2>
            <div class="grid grid-cols-2 xl:grid-cols-4 gap-4 w-full">
                {#each data.upcomingAppointments as upcomingAppointment}
                    <div class="flex flex-col gap-4 bg-gray-50 p-8 rounded border ">
                        <h3 class="text-xl font-semibold">{upcomingAppointment.name}</h3>
                        <p>{new Date(upcomingAppointment.startTime).toLocaleDateString()} {new Date(upcomingAppointment.startTime).toLocaleTimeString()}</p>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
    <div class="flex justify-between items-center">

        <a href="/account/settings">
            <h2 class="text-2xl font-semibold">{langStrings[$langStore]["accountCalendarsTitle"]}</h2>

        </a>

    </div>

    <div class="flex flex-col justify-between gap-4">
        {#if page && page.calendars && page.calendars.length > 0}
            <CalendarCard {page} {token_id}/>
        {:else}
            <AccountEmptyCard title={langStrings[$langStore]["emptyCalendarCardTitle"]}
                              description={langStrings[$langStore]["emptyCalendarCardDescription"]}
                              link="/account/settings/calendar/create"
                              action={langStrings[$langStore]["emptyCalendarCardAction"]}/>

        {/if}
    </div>

    <AccountEvents events={page?.events}/>
    <Toast/>
</div>