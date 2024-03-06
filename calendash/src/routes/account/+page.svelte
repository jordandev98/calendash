<script>
    import {clipboard, Toast} from "@skeletonlabs/skeleton";
    import Icon from "@iconify/svelte";
    import AccountEvents from "$lib/settings/AccountEvents.svelte";
    import CalendarCard from "$lib/settings/CalendarCard.svelte";
    import AccountEmptyCard from "$lib/account/AccountEmptyCard.svelte";

    let copyState = false;

    export let data;
    const page = data.page
    const token_id = data.token_id;

</script>

<div class="flex flex-col w-11/12 pt-12 gap-4">
    <div class="flex items-center gap-8 ">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <h2 class="text-2xl font-semibold">My page</h2>

            {#if !page || !page.url}

                <AccountEmptyCard title="Create your page"
                                  description="Create your personalized page where clients can easily schedule appointments for the events you’ve designed"
                                  .
                                  link="/account/page" action="Create your page"/>

            {:else}
                <div class="flex flex-col gap-4 p-8 rounded bg-gray-50">
                    <h4 class="text-lg font-semibold">My url</h4>
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


        </div>
    </div>
    <div class="flex justify-between items-center">

        <a href="/account/settings">
            <h2 class="text-2xl font-semibold">My calendars</h2>

        </a>

    </div>

    <div class="flex flex-col justify-between gap-4">
        {#if page.calendars && page.calendars.length > 0}
            <CalendarCard {page} {token_id}/>
        {:else}
            <AccountEmptyCard title="Create your first calendar" description="Create your schedule, link it with Google Calendars, and start accepting
                        bookings or appointments seamlessly."
                              link="/account/settings/calendar/create" action="Create your first calendar"/>

        {/if}
    </div>

    <AccountEvents events={page.events}/>
    <Toast/>
</div>