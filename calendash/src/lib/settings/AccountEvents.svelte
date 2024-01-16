<script>
    import Icon from "@iconify/svelte";
    import {formatEventDuration} from "../../service/date/TimeService.ts";

    export let events;
</script>
<div>
    <div class="flex flex-col p-8 bg-gray-50 gap-4">
        <div class="flex justify-between items-center">
            <p class="text-xl font-semibold">My events</p>
            <button class="btn variant-outline-primary text-primary-500">
                Add event type
            </button>
        </div>

        <div class="flex flex-col justify-between gap-4">
            {#if events}
                {#each events as event}
                    <div class="flex flex-col p-4 border gap-2">
                        <div class="flex items-center justify-between">
                            <p class="text-xl font-bold">{event.name}</p>
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

                {/each}
            {:else}
                <p>Your page doesn't have a calendar yet</p>
                <a href="/account/settings/calendar/create">
                    <button class="btn variant-filled-primary">Configure a new calendar</button>
                </a>

            {/if}
        </div>

    </div>
</div>