<script>
    import {enhance} from '$app/forms';
    import {getModalStore, getToastStore, ProgressRadial} from "@skeletonlabs/skeleton";

    export let calendarId;
    let email = "";

    let isLoading = false;

    const toastStore = getToastStore();
    const modalStore = getModalStore();

</script>


<div class="flex flex-col gap-4 p-8 bg-gray-50 rounded-xl border min-w-sm max-w-lg">
    <h2 class="text-2xl font-semibold">Share your calendar.</h2>

    <form class="flex flex-col gap-4" method="post" action="?/shareCalendar" use:enhance={ () => {
       isLoading = true;
       return async ({ update }) => {
        isLoading = false;
        modalStore.close();
        update();
        toastStore.trigger({message : "An email containing the invitation has been sent! 📧" , autohide: false ,background : "variant-filled-success" } );
    };
    }}>
        <label class="flex flex-col gap-2">
            <span class="font-semibold">Email</span>
            <input class="rounded" name="email" type="email" bind:value={email}/>
            <input class="hidden" name="calendarId" bind:value={calendarId}/>
        </label>
        {#if isLoading}
            <button type="submit" disabled={email.length <= 0} class="btn variant-filled"><ProgressRadial width="w-6"  meter="stroke-white"/></button>
        {:else}
            <button type="submit" disabled={email.length <= 0} class="btn variant-filled">Share</button>
        {/if}
    </form>


</div>