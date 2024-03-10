<script>

    import {authStore} from "../../../store/store.js";
    import {getToastStore, ProgressRadial, Toast} from "@skeletonlabs/skeleton";
    import {enhance} from '$app/forms';
    import {langStrings} from "../../../text/langText.js";
    import {langStore} from "../../../store/langStore.js";

    export let data;

    let user;

    authStore.subscribe(value => {
        user = value.user
    })

    if (data.page?._id) {
        user.url = data.page.url
    }


    const toastStore = getToastStore();
    let isUrlAvailable = false;
    let typingTimer;
    let isLoading = false;
    let pageUpdating = false;
    let isTaken = false;

    const waitUserToEndTyping = () => {
        isLoading = true;
        isTaken = false;
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => verifyUrlTaken(), 500);
    }

    const verifyUrlTaken = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/page/${user.url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status === 204) {
            isUrlAvailable = true;
            isLoading = false;
            return
        }
        isTaken = true;
        isLoading = false;
    }

</script>
<div class="p-8">
    <ol class="breadcrumb">
        <li class="crumb"><a class="anchor" href="/account">{langStrings[$langStore]["accountMenu"]}</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li>{langStrings[$langStore]["pageMenu"]}</li>
    </ol>
    <form class="my-12 p-8 max-w-2xl bg-gray-50 h-fit border rounded" method="post" use:enhance={() => {
        pageUpdating = true;
        return async({result}) => {
            pageUpdating = false;
            if (result.type === "success") {
                toastStore.trigger({
                    background : "variant-filled-success",
                    message : langStrings[$langStore]["accountCreateMessageSuccess"]
                })
            }
            else {
                toastStore.trigger({
                    background : "variant-filled-error",
                    message : langStrings[$langStore]["accountCreateMessageError"]
                })
            }
        }
    }}>
        <div class="flex flex-col gap-8 ">
            <p class="text-2xl font-bold">{langStrings[$langStore]["accountCreatePageTitle"]}</p>
            <p>{langStrings[$langStore]["accountCreatePageParagraph"]}</p>
            <div class="flex flex-col gap-4">
                <p class="text-xl font-bold"> {langStrings[$langStore]["accountCreateLinkTitle"]}</p>
                <p>{langStrings[$langStore]["accountCreateLinkParagraph"]}</p>
                <div class="flex justify-center items-center gap-0.5 relative">
                    <p class="font-bold">calendash.com/</p>
                    <input class={isTaken ? "w-full rounded px-1 input-error": "w-full rounded px-1"} name="url"
                           maxlength="28"
                           bind:value={user.url}
                           on:input={() => waitUserToEndTyping()}/>
                    <div class="absolute inset-y-0 right-2 pl-3 flex items-center pointer-events-none">
                        {#if isLoading}
                            <ProgressRadial width="w-6"/>
                        {/if}
                    </div>
                </div>
                {#if isTaken}
                    <p class=" text-error-500">{langStrings[$langStore]["accountCreateError"]}</p>
                {/if}
            </div>

            {#if pageUpdating}
                <button class="btn variant-filled-primary">
                    <ProgressRadial width="w-6" meter="stroke-white"/>
                </button>

                {:else}
                <button class="btn variant-filled-primary" type="submit"
                        disabled={!user.url || !isUrlAvailable || isLoading  || isTaken}>
                    {data.page?._id ? "Update url" : langStrings[$langStore]["accountCreateTitleAction"]}
                </button>
            {/if}
        </div>
    </form>
    <Toast/>
</div>

