<script>
    import Icon from "@iconify/svelte";
    import {formatDuration} from "../../../../service/date/TimeService.ts";
    import {ProgressRadial} from "@skeletonlabs/skeleton";
    import {eventStore} from "../../../../store/eventStore.ts";

    let isLoading = false;

    let currentEvent;

    eventStore.subscribe(value => {
        currentEvent = value
    })

</script>


<div class="flex flex-col justify-start  w-11/12 pt-8 gap-8">
    <ol class="breadcrumb">
        <li class="crumb"><a class="anchor" href="/account">Account</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a class="anchor" href="/account/events">Events</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li>Create</li>
    </ol>

    <form class="flex border rounded-md flex-col p-4 gap-6" method="post" on:submit={e => e.preventDefault}>
        <p class="h4 font-semibold">New event type</p>
        <label class="flex flex-col gap-2">
            <span class="font-semibold">Event name *</span>
            <input class="rounded bg-surface-50" name="name" placeholder="Man haircut" bind:value={currentEvent.name}/>
        </label>
        <div class="flex flex-col gap-2">
            <span class="font-semibold">Duration in minutes *</span>

            <input class=" rounded bg-surface-50" name="duration" type="number" bind:value={currentEvent.duration}/>


        </div>
        <label class="flex flex-col gap-2">
            <span class="font-semibold">Location (Optional)</span>
            <input class=" rounded bg-surface-50" name="location" placeholder="20 Queen street" bind:value={currentEvent.location}/>
        </label>
        <label class="flex flex-col gap-2">
            <span class="font-semibold">Price (Optional)</span>
            <input class=" rounded bg-surface-50" name="price" placeholder="$20" bind:value={currentEvent.price}/>
        </label>
        {#if isLoading}
            <button class="btn variant-filled-primary">
                <ProgressRadial width="w-6"/>
            </button>
        {:else}
            <button class="btn variant-filled-primary" type="submit">Add new type event</button>
        {/if}
    </form>

    <div class="flex flex-col border p-4 gap-4">
        <div class="flex justify-between items-center">
            <p class="h3 font-bold">{currentEvent.name ? currentEvent.name : "My event name"}</p>
            {#if currentEvent.price}
                <div class="flex flex-row items-center gap-2">
                    <p class="h4">{currentEvent.price}</p>
                </div>
            {/if}
        </div>

        <div class="flex flex-row items-center gap-2">
            <Icon icon="mdi:clock-outline" width="20"/>
            <span>{formatDuration(currentEvent.duration)}</span>
        </div>
        <div class="flex flex-row items-center gap-2">
            <Icon icon="mdi:map-marker-outline" width="20"/>
            <span>{currentEvent.location ? currentEvent.location : "My event location"}</span>
        </div>
    </div>
</div>
