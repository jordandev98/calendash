<script>
    import {clipboard, Toast} from "@skeletonlabs/skeleton";
    import {goto} from "$app/navigation";
    import Icon from "@iconify/svelte";
    import AccountEvents from "$lib/settings/AccountEvents.svelte";
    import CalendarCard from "$lib/settings/CalendarCard.svelte";

    let copyState = false;

    export let data;
    const page = data.page
    const token_id = data.token_id;

</script>

<div class="flex flex-col w-11/12 pt-12 gap-4">
    {#if data && data.page}

        <div class="flex items-center gap-8 ">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h2 class="text-2xl font-semibold">My link</h2>
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