<script>
    import {goto} from "$app/navigation";
    import {enhance} from "$app/forms";
    import {ProgressRadial} from "@skeletonlabs/skeleton";

    export let data;

    const currentEvent = data.event;

    const isLoading = false;
</script>

<div class="flex flex-col justify-start  w-11/12 pt-8 gap-8">
    <form class="flex rounded-md flex-col p-8 gap-6 bg-gray-50" method="post" action="?/saveEvent" use:enhance={() => {
        return async ({result}) => {
            if (result.type === "success") {
                await goto("/account")
            }
        }
    }}>
        <input class="hidden" required name="_id" bind:value={currentEvent._id}/>

        <p class="h4 font-semibold">Update event</p>
        <label class="flex flex-col gap-2">
            <span class="font-semibold">Event name *</span>
            <input class="rounded " required name="name" placeholder="Men's haircut" bind:value={currentEvent.name}/>
        </label>
        <div class="flex flex-col gap-2">
            <span class="font-semibold">Duration in minutes *</span>

            <input class=" rounded" required name="duration" type="number" bind:value={currentEvent.duration}/>


        </div>
        <label class="flex flex-col gap-2">
            <span class="font-semibold">Location (Optional)</span>
            <input class=" rounded" name="location" placeholder="20 Queen street" bind:value={currentEvent.location}/>
        </label>
        <label class="flex flex-col gap-2">
            <span class="font-semibold">Price (Optional)</span>
            <input class=" rounded" name="price" placeholder="$20" bind:value={currentEvent.price}/>
        </label>
        {#if isLoading}
            <button class="btn variant-filled-primary">
                <ProgressRadial width="w-6"/>
            </button>
        {:else}
            <button class="btn variant-filled-primary" type="submit">Save 💾</button>
        {/if}
    </form>
</div>
