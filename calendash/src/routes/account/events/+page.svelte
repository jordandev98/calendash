<script>

    import {settingsStore} from "../../../store/settingsStore.ts";
    import EventList from "$lib/settings/EventList.svelte";

    let settings

    settingsStore.subscribe(value => {
        settings = value
    })
</script>

<div class="flex flex-col gap-4  w-11/12 pt-8">
    <div class="flex items-center justify-between">
        <p class="text-2xl font-semibold">My events</p>
        <a href="/account/events/create">
            <button class="btn variant-filled-primary w-fit">Add a new event types</button>
        </a>
    </div>


    {#if settings}
        <div class="flex flex-col gap-8">


            <EventList></EventList>
            <div class="grid grid-cols-1 lg:grid-cols-2 w-full md:w-2/3 self-center justify-center items-center ">

                <div class="flex flex-col w-full justify-center gap-4 ">
                    <p class="text-xl font-semibold">Create an event type</p>
                    <p>You can utilize event types to establish meeting specifics for regular appointments, such as hair
                        appointments, dental check-ups, medical consultations, tattoo sessions, and more.</p>
                </div>
                <div class="flex justify-end">
                    <img src="/illustrations/event.png" alt="create multiples types of event to help your client book the correct duration">
                </div>



            </div>
        </div>

    {/if}
</div>
