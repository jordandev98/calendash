<script>

    import {authStore} from "../../store/store.js";
    import {getCheckoutUrl} from "../../service/stripe/stripePayment.ts";
    import {goto} from "$app/navigation";
    import {ProgressRadial} from "@skeletonlabs/skeleton";

    let isLoading = false;

    const checkout = async () => {
        isLoading = true;

        let url = "/login"

        if ($authStore.user) {
            url = await getCheckoutUrl($authStore.user._id, import.meta.env.VITE_ENTERPRISE_PLAN_KEY, 1)
        }

        await goto(url)

        isLoading = false;
    }

</script>


<div class="flex flex-col gap-8 p-8 bg-gray-50 rounded-xl border max-w-lg">
    <p class="text-5xl text-center">👑</p>
    <div class="flex flex-col gap-2">
        <h2 class="text-lg font-semibold">Upgrade your plan.</h2>
        <h2 class="text-2xl font-semibold">You reached the maximum calendar.</h2>
    </div>


    <div class="flex flex-col gap-4">
        <p>✓ Multiples sharable calendars</p>
        <p>✓ Unlimited booking events</p>
    </div>


    <div class="grid grid-cols-2 flex-col sm:flex-row gap-4">
        <a href="/pricing">
            <button class="btn variant-outline-primary text-primary-500">Compare all plans</button>
        </a>
        {#if isLoading}
            <button class="btn variant-filled-primary" on:click={checkout}>
                <ProgressRadial width="w-5" meter="stroke-white" stroke={60}/>
            </button>
        {:else}
            <button class="btn variant-filled-primary" on:click={checkout}>Upgrade to ENTERPRISE</button>
        {/if}
    </div>

</div>