<script>
    import Icon from "@iconify/svelte";
    import {getToastStore, popup, Toast} from "@skeletonlabs/skeleton";
    import {formatEventDuration} from "../../service/date/TimeService.ts";
    import {enhance} from "$app/forms";

    const toastStore = getToastStore();

    export let events;

</script>

{#if events.length > 0}
    {#each events as event , i}
        <div class="flex flex-col p-4 gap-2 bg-gray-50">
            <div class="flex items-center justify-between">
                <p class="text-xl font-bold">{event.name}</p>
                <button class="btn hover:bg-gray-300"
                        use:popup={{event: 'click',target: `popupClick${i}`,placement: 'bottom'}}>
                    <Icon icon="material-symbols:settings"/>
                    ▾
                </button>
            </div>

            <div class="flex flex-row items-center gap-2">
                <Icon icon="mdi:clock-outline" width="20"/>
                <span>{formatEventDuration(event.duration)}</span>
            </div>
            <div class="flex flex-row items-center gap-2">
                <Icon icon="mdi:map-marker-outline" width="20"/>
                <span>{event.location ? event.location : "My event location"}</span>
            </div>

        </div>

        <div class="border p-2 bg-gray-100 w-32" data-popup="popupClick{i}">
            <div class=" justify-start">
                <a href={"events/edit/"+event._id}>
                    <button class="btn flex gap-2">
                        <Icon icon="material-symbols:edit-outline" width="20"/>
                        Edit
                    </button>
                </a>

                <form method="post" action="?/deleteEvent" use:enhance={() => {
                    return async ({result}) => {
                        if (result.type === "success") {
                            const index = events.findIndex(eventCalendar => eventCalendar._id === event._id);

                            if (index !== -1) {
                              events.splice(index, 1);
                            }
                            toastStore.trigger({message : "Event deleted successfully !" , background : "bg-success-500"})
                        }
                    }}}
                >
                    <input type="hidden" name="event_id" value={event._id}>
                    <button class="btn flex gap-2" type="submit">
                        <Icon icon="material-symbols:delete-outline" width="20"/>
                        Delete
                    </button>
                </form>

            </div>
        </div>
    {/each}
    <Toast/>
{/if}