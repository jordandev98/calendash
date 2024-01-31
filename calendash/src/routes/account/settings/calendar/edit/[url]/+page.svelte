<script>
    import Schedule from "$lib/settings/Schedule.svelte";
    import {settingsStore} from "../../../../../../store/settingsStore.ts";
    import CalendarImageUpload from "$lib/settings/CalendarImageUpload.svelte";

    export let data;
    console.log(data)
    let calendar = data?.calendar;
    settingsStore.set(calendar)


    const updateCalendar = async (calendarId) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/calendar/${calendarId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token_id}`
            },
            body: JSON.stringify($settingsStore)
        });
    }
</script>


<div class="flex flex-col h-fit w-11/12 mt-12 bg-gray-50 p-8 rounded-xl">
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
