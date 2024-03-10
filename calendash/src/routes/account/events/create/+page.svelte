<script>
    import Icon from "@iconify/svelte";
    import {ProgressRadial} from "@skeletonlabs/skeleton";
    import {eventStore} from "../../../../store/eventStore.ts";
    import {formatEventDuration} from "../../../../service/date/TimeService.ts";
    import { enhance , applyAction} from "$app/forms";
    import {goto} from "$app/navigation";
    import {langStrings} from "../../../../text/langText.js";
    import {langStore} from "../../../../store/langStore.js";

    let isLoading = false;

    let currentEvent;

    let durationMinutes = 30;
    let durationHours = 0;


    eventStore.subscribe(value => {
        currentEvent = value
    })

    const handleDurationChange = () => {
        $eventStore.duration = durationMinutes + durationHours * 60
    }


</script>


<div class="flex flex-col justify-start  w-11/12 pt-8 gap-8">
    <ol class="breadcrumb">
        <li class="crumb"><a class="anchor" href="/account">Account</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a class="anchor" href="/account/events">Events</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li>Create</li>
    </ol>

    <form class="flex rounded-md flex-col p-8 gap-6 bg-gray-50" method="post" action="?/createEvent" use:enhance={() => {
        return async ({result}) => {
            if (result.type === "success") {
                await goto("/account")
            }
        }
    }}>
        <p class="h4 font-semibold">{langStrings[$langStore]["createEventPageTitle"]}</p>
        <label class="flex flex-col gap-2">
            <span class="font-semibold">{langStrings[$langStore]["createEventLabelName"]}</span>
            <input class="rounded " required name="name" placeholder={langStrings[$langStore]["createEventPlaceholderName"]} bind:value={currentEvent.name}/>
        </label>
        <div>

            <span class="font-semibold">{langStrings[$langStore]["createEventLabelDuration"]}</span>
            <div  class="grid grid-cols-2 gap-4">
                <label class="flex flex-col">
                    <span>{langStrings[$langStore]["createEventLabelHeure"]}</span>
                    <input class=" rounded" required name="hours" type="number" bind:value={durationHours} on:change={()=> handleDurationChange()}/>
                </label>

                <label class="flex flex-col">
                    <span>{langStrings[$langStore]["createEventLabelMinuites"]}</span>
                    <input class=" rounded" required name="minutes" type="number" bind:value={durationMinutes} on:change={()=> handleDurationChange()}/>
                </label>
            </div>

            <input class="hidden" required name="duration" type="number" bind:value={currentEvent.duration}/>


        </div>
        <label class="flex flex-col gap-2">
            <span class="font-semibold">{langStrings[$langStore]["createEventLabelLocation"]}</span>
            <input class=" rounded" name="location" placeholder={langStrings[$langStore]["createEventPlaceholderLocation"]} bind:value={currentEvent.location}/>
        </label>
        <label class="flex flex-col gap-2">
            <span class="font-semibold">{langStrings[$langStore]["createEventLabelPrice"]}</span>
            <input class=" rounded" name="price" placeholder="$20" bind:value={currentEvent.price}/>
        </label>
        {#if isLoading}
            <button class="btn variant-filled-primary">
                <ProgressRadial width="w-6"/>
            </button>
        {:else}
            <button class="btn variant-filled-primary" type="submit">{langStrings[$langStore]["eventPageCreateAction"]}</button>
        {/if}
    </form>

    <div class="flex flex-col border p-4 gap-4 bg-gray-50">
        <div class="flex justify-between items-center">
            <p class="h3 font-bold">{currentEvent.name ? currentEvent.name : langStrings[$langStore]["createEventMyEventTitle"]}</p>
            {#if currentEvent.price}
                <div class="flex flex-row items-center gap-2">
                    <p class="h3">{currentEvent.price}</p>
                </div>
            {/if}
        </div>

        <div class="flex flex-row items-center gap-2">
            <Icon icon="mdi:clock-outline" width="20"/>
            <span>{formatEventDuration(currentEvent.duration)}</span>
        </div>
        <div class="flex flex-row items-center gap-2">
            <Icon icon="mdi:map-marker-outline" width="20"/>
            <span>{currentEvent.location ? currentEvent.location : langStrings[$langStore]["createEventMyEventLocationTitle"]}</span>
        </div>
    </div>
</div>
