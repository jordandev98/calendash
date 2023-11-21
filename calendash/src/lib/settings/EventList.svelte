<script>
    import Icon from "@iconify/svelte";
    import {settingsStore} from "../../store/settingsStore.js";
    import {popup} from "@skeletonlabs/skeleton";

    let settings
    let calendarNumber = 0

    settingsStore.subscribe(value => {
        settings = value
    })
</script>

{#if settings.calendars[calendarNumber].events.length > 0}
    {#each settings.calendars[calendarNumber].events as event , i}
        <div class="flex flex-col p-4 border gap-2">
            <div class="flex items-center justify-between">
                <p class="text-xl font-bold">{event.name}</p>
                <button class="btn hover:bg-gray-300"  use:popup={{event: 'click',target: `popupClick${i}`,placement: 'bottom'}}><Icon icon="material-symbols:settings"/>▾</button>
            </div>

            <div class="flex flex-row items-center gap-2">
                <Icon icon="mdi:clock-outline" width="20"/>
                <span>{event.duration}</span>
            </div>
            <div class="flex flex-row items-center gap-2">
                <Icon icon="mdi:map-marker-outline" width="20"/>
                <span>{event.location ? event.location : "My event location"}</span>
            </div>
        </div>

        <div class="border p-2 bg-gray-100 w-32" data-popup="popupClick{i}">
            <div class=" justify-start">
                <button class="btn">Edit</button>
                <button class="btn">Delete</button>
            </div>

        </div>
    {/each}

{/if}