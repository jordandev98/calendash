<script>
    import Icon from "@iconify/svelte";
    import {getToastStore, popup, ProgressRadial, Toast} from "@skeletonlabs/skeleton";
    import {formatDuration} from "../../service/date/TimeService.ts";
    import {saveUserCalendar} from "../../service/firebase/settings.ts";
    import {authStore} from "../../store/store.js";

    let calendarSetting
    let calendarNumber = 0
    let isLoading = false;
    const toastStore = getToastStore();

    authStore.subscribe(value => {
        calendarSetting = value.user
    })

    const handleRemoveEvent = (eventIndex) => {
        // authStore.update(settings => {
        //     if (settings.calendars[calendarNumber] && settings.calendars[calendarNumber].events.length > eventIndex) {
        //         settings.calendars[calendarNumber].events.splice(eventIndex, 1);
        //     }
        //     return settings;
        // });
    }

    const handleSaveSettings = async () => {
        let message = "Change saved"
        let bg = "variant-filled"
        isLoading = true;
        try {
            await saveUserCalendar(calendarSetting);
        } catch (err) {
            message = err?.message;
            message = message ? message : "Your changed could not be saved"
            bg = "variant-filled-error"
        }
        toastStore.trigger({
            message: message,
            hideDismiss: true,
            timeout: 2000,
            background: bg
        });
        isLoading = false;
    }

</script>

{#if calendarSetting.calendars[calendarNumber].events.length > 0}
    {#each calendarSetting.calendars[calendarNumber].events as event , i}
        <div class="flex flex-col p-4 border gap-2 bg-gray-100">
            <div class="flex items-center justify-between">
                <p class="text-xl font-bold">{event.name}</p>
                <button class="btn hover:bg-gray-300"
                        use:popup={{event: 'click',target: `popupClick${i}`,placement: 'bottom'}}>
                    <Icon icon="material-symbols:settings"/>
                    ▾
                </button>
            </div>

            <div class="flex flex-row items-center gap-2">
                <Icon icon="mdi:clock-outline" width="20"/>
                <span>{formatDuration(event.duration)}</span>
            </div>
            <div class="flex flex-row items-center gap-2">
                <Icon icon="mdi:map-marker-outline" width="20"/>
                <span>{event.location ? event.location : "My event location"}</span>
            </div>

        </div>

        <div class="border p-2 bg-gray-100 w-32" data-popup="popupClick{i}">
            <div class=" justify-start">
                <button class="btn flex gap-2">
                    <Icon icon="material-symbols:edit-outline" width="20"/>
                    Edit
                </button>
                <button class="btn flex gap-2" on:click={() => handleRemoveEvent(i)}>
                    <Icon icon="material-symbols:delete-outline" width="20"/>
                    Delete
                </button>
            </div>

        </div>
    {/each}
    {#if isLoading}
        <button class="btn variant-filled-primary">
            <ProgressRadial width="w-6"/>
        </button>
    {:else}
        <button class="btn variant-filled-primary" on:click={()=> handleSaveSettings()}>Save 💾</button>

    {/if}
    <Toast/>
{/if}