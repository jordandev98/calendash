<script>
    import {Avatar, getModalStore, Modal, SlideToggle} from "@skeletonlabs/skeleton";
    import Icon from "@iconify/svelte";
    import {goto} from "$app/navigation";
    import UpgradePlan from "$lib/modal/UpgradePlan.svelte";

    const modalStore = getModalStore();

    const modalUpgradePlan = {ref : UpgradePlan}
    const upgradeModal = {
        type: 'component',
        component: modalUpgradePlan,
    };
    export let page;
    export let token_id;

    $:calendars = page.calendars;

    const handleIsActive = async (calendarId, value) => {

        const res = await fetch(`${import.meta.env.VITE_API_URL}/calendar/active/${calendarId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_id}`
            },
            body: JSON.stringify({
                isActive: value
            })
        });
        if (res.status === 400) {
            if (value) {
                updateCalendarIsActive(calendarId);
                modalStore.trigger(upgradeModal);
            }
        }
        else if (res.status > 404) {
            updateCalendarIsActive(calendarId);
        }
    }

    const updateCalendarIsActive = (calendarId) => {
        calendars = calendars.map((c) => {
            if (c._id === calendarId) {
                // Update the isActive property to false
                return {...c, isActive: false};
            } else {
                // Keep other calendars unchanged
                return c;
            }
        });
        page.calendars = calendars;
    }

</script>

{#if page}
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {#each calendars as calendar , i}
            <div class={calendar.isActive ? "flex flex-col gap-4 border-primary-500 border-t-8 bg-gray-50  p-4 rounded" : "flex flex-col gap-4 border-t-8 bg-gray-50  p-4 rounded"}>
                <div class="flex items-center justify-between ">
                    <p class="text-2xl font-semibold">{calendar.name}</p>
                    <div class="flex  gap-2">
                        <a class="self-end text-underline" href={`/account/settings/calendar/edit/${calendar._id}`}>

                            <Icon icon="ic:round-open-in-new" width="24"/>
                        </a>
                        <SlideToggle name="active" active="bg-primary-500" size="sm" bind:checked={calendar.isActive}
                                     on:change={() => handleIsActive(calendar._id , calendar.isActive)}/>

                    </div>

                </div>


                <div class="flex flex-col gap-4 px-2">
                    <Avatar src={import.meta.env.VITE_AWS_BASE_URL+calendar.img}></Avatar>
                </div>


            </div>
            <div class="p-4 bg-gray-50 w-60 border" data-popup={`actionMenu${i}`}>
                <div class="pb-2"><p>Modifier</p></div>
                <div class="pb-2"><p>Supprimer</p></div>
                <div class="arrow bg-surface-100-800-token pb-2"/>

            </div>
        {/each}
    </div>
{/if}

<Modal />
