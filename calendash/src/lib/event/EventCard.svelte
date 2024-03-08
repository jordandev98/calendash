<script>
    import {formatEventDuration} from "../../service/date/TimeService.ts";
    import Icon from "@iconify/svelte";

    export let event;
</script>

<a href="/account/events/edit/{event._id}">
    <div class="flex flex-col py-4 px-8 border gap-2 rounded bg-gray-50 hover:cursor-pointer ">
        <div class="flex items-center justify-between">
            <p class="text-xl font-bold">{event.name}</p>
            {#if event.price}
                <span class="h4">{event.price}</span>
            {/if}
        </div>

        <div class="flex flex-row items-center gap-2">
            <Icon icon="mdi:clock-outline" width="20"/>
            <span>{formatEventDuration(event.duration)}</span>
        </div>
        <div class="flex flex-row items-center gap-2">
            {#if event.location}
                <Icon icon="mdi:map-marker-outline" width="20"/>
                <span>{event.location}</span>
            {/if}
        </div>
    </div>
</a>
