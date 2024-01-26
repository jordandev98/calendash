<script>
    import Schedule from "$lib/settings/Schedule.svelte";
    import {settingsStore} from "../../../../../../store/settingsStore.ts";
    import {Avatar, FileButton} from "@skeletonlabs/skeleton";
    import Icon from "@iconify/svelte";

    export let data;
    console.log(data)
    let file;
    let calendar = data?.calendar;
    settingsStore.set(calendar)
    let imageUploading = false;

    const uploadCalendarPhoto = async () => {
        imageUploading = true;
        const formData = new FormData();
        formData.append("file", file[0]);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/calendar/image/${calendar._id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${data.token_id}`
            },
            body : formData

        });
        const response = await res.json();
        imageUploading = false;
        calendar.img = response.img

    }

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
    <div class="flex justify-center relative">
        {#if !imageUploading}
            <FileButton name="file" button="bg-transparent" bind:files={file} on:change={uploadCalendarPhoto}>
                <div class="absolute inset-0 flex items-center justify-center opacity-100">
                    <Icon icon="material-symbols:upload" width="48" color="#374151"/>
                </div>

                <Avatar src={import.meta.env.VITE_AWS_BASE_URL+calendar.img} width="w-24" class="group hover:opacity-20"
                        border="border-4 border-surface-300-600-token hover:border-surface-800"
                        cursor="cursor-pointer"></Avatar>
            </FileButton>
        {:else}
            <!-- Use group and hover classes for the avatar -->
            <div  class="placeholder-circle animate-pulse w-24">

            </div>
        {/if}
    </div>
    <div class="flex flex-col gap-8">
        <label class="flex flex-col">
            <span class="font-semibold">Calendar name</span>
            <input name="name" class="border border-gray-300 rounded-xl bg-gray-50" bind:value={calendar.name}/>
        </label>
        <Schedule/>
        <button class="btn variant-filled-primary" on:click={updateCalendar(calendar._id)}>Save</button>
    </div>
</div>
