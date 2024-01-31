<script>


    import {getPortalUrl} from "../../../service/stripe/stripePayment.ts";
    import {goto} from "$app/navigation";
    import {getProductById} from "../../../data/products.ts";

    let subscription;

    export let data;
    const subscriptions = data.subscriptions

    const handleSubscription = async (customerId) => {
        let url = "/login"
        if (customerId) {
            url = await getPortalUrl(customerId)
        }

        await goto(url)
    }


</script>
<div class="flex flex-col w-11/12 gap-4 pt-8">
    <ol class="breadcrumb">
        <li class="crumb"><a class="anchor" href="/account">My account</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a class="anchor" href="/account/plans">Plans & billing</a></li>
    </ol>

    <p class="text-2xl font-bold">Plans & Billing</p>
    {#if subscriptions}
        {#each subscriptions as subscription}
            <div class="bg-gray-50 rounded-xl flex flex-col p-8 gap-4">

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-between w-full ">
                    <div>
                        <p>Current plan</p>
                        <p class="text-xl font-bold">{getProductById(subscription.planId).name}</p>
                    </div>
                    <div>
                        <p>Plan will end on</p>
                        <p class="text-xl font-bold">{new Date(subscription.currentPeriodEnd).toDateString()}</p>
                    </div>
                    <div>
                        <p>Status</p>
                        <p class={subscription.status === "active" ? "text-xl font-bold text-emerald-500": "text-xl font-bold text-red-500" }>{subscription.status}</p>
                    </div>
                </div>
                <button class="btn variant-glass" on:click={()=>handleSubscription(subscription.customerId)}>Manage
                    subscriptions
                </button>
            </div>

        {/each}

    {/if}
</div>
