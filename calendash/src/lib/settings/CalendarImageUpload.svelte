<script>
    import {Avatar, FileButton} from "@skeletonlabs/skeleton";
    import Icon from "@iconify/svelte";

    export let data;
    const calendar = data.calendar;

    let file;

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
</script>
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