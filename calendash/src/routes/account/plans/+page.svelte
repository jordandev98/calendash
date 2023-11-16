<script>


    import {authStore} from "../../../store/store.js";
    import {getPortalUrl} from "../../../service/stripe/stripePayment.ts";
    import {goto} from "$app/navigation";
    import {getProductById} from "../../../data/products.ts";

    let subscription;

    authStore.subscribe(async value => {
        subscription = value?.user?.subscription;
        if (subscription) {

        }
    })

    const handleSubscription = async () => {
        let url = "/login"
        if ($authStore.user) {
            url = await getPortalUrl(app)
        }

        await goto(url)
    }

</script>
<div class="flex flex-col w-11/12 self-center gap-8 pt-8">
    <ol class="breadcrumb">
        <li class="crumb"><a class="anchor" href="/elements/breadcrumbs">My account</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a class="anchor" href="/elements/breadcrumbs">Plans & billing</a></li>
    </ol>
    <p class="text-2xl font-bold">Plans & Billing</p>
    {#if subscription}
        <div class="card flex items-center p-8 gap-12">
            <div class="flex flex-1 gap-8 justify-between">
                <div>
                    <p>Current plan</p>
                    <p class="text-xl font-bold">{getProductById(subscription.planId).name}</p>
                </div>
                <div>
                    <p>Plan will end on</p>
                    <p class="text-xl font-bold">{new Date(subscription.renewDate.seconds * 1000).toDateString()}</p>
                </div>
                {#if subscription.autoRenew}
                    <div>
                        <p>Plan will renew on</p>
                        <p class="text-xl font-bold">{new Date(subscription.renewDate.seconds * 1000).toDateString()}</p>
                    </div>
                {/if}
            </div>

            <button class="btn variant-filled-primary" on:click={handleSubscription}>Manage subscriptions</button>
        </div>

    {/if}
</div>
