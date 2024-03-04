<script>
    import Schedule from "$lib/settings/Schedule.svelte";
    import {settingsStore} from "../../../../../../store/settingsStore.ts";
    import CalendarImageUpload from "$lib/settings/CalendarImageUpload.svelte";
    import {goto} from "$app/navigation";
    import {getToastStore, Toast} from "@skeletonlabs/skeleton";

    export let data;
    let calendar = data?.calendar;
    settingsStore.set(calendar)
    const toastStore = getToastStore();

    const updateCalendar = async (calendarId) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/calendar/${calendarId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token_id}`
            },
            body: JSON.stringify($settingsStore)
        });

        if (res.status === 200) {
            const t  = {
                message: 'Calendar updated successfully',
                background: 'variant-filled-success',
            };
            await goto("/account/settings");

            toastStore.trigger(t);
        }
    }
</script>

<div class="flex flex-col p-8">
    <ol class="breadcrumb">
        <li class="crumb"><a class="anchor" href="/account">Account</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a class="anchor" href="/account/settings">Calendars</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li>Edit</li>
    </ol>
    <div class="flex flex-col h-fit w-11/12 mt-12 bg-gray-50 rounded-xl p-8">
        <CalendarImageUpload data={data}/>
        <div class="flex flex-col gap-8">
            <label class="flex flex-col">
                <span class="font-semibold">Calendar name</span>
                <input name="name" class="border border-gray-300 rounded-xl bg-gray-50" bind:value={calendar.name}/>
            </label>
            <Schedule/>

            <button class="btn variant-filled-primary" on:click={updateCalendar(calendar._id)}>Save</button>
        </div>
    </div>
</div>

