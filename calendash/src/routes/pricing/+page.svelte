<script>
    import {products} from "../../data/products.ts";
    import {goto} from "$app/navigation";
    import {getCheckoutUrl} from "../../service/stripe/stripePayment.ts";
    import {authStore} from "../../store/store.js";
    import {RadioGroup, RadioItem} from "@skeletonlabs/skeleton";

    let isBilledMonthly = false;
    console.log(products)
    const checkout = async (productId) => {
        let url = "/login"
        if ($authStore.user && productId) {
            console.log($authStore.user)
            // if (await getPremiumStatus(app)) {
            //     url = "/account/plans"
            // }
            // else {
            url = await getCheckoutUrl($authStore.user._id, productId)
            //}

        }


        await goto(url)
    }
</script>

<div class="flex justify-center flex-col w-11/12 self-center">
    <div class="flex items-center justify-center min-w-sm">
        <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary" background="bg-transparent"
                    border="border-none">
            <RadioItem bind:group={isBilledMonthly} value={true}>Billed monthly</RadioItem>
            <RadioItem bind:group={isBilledMonthly} value={false}>Billed annually (save 20%)</RadioItem>

        </RadioGroup>


    </div>
    <div class="grid grid-cols-1 py-8 gap-4 lg:grid-cols-3">


        {#each products as product}
            <div class="card flex flex-col p-8 gap-4 justify-between">
                <div class="flex flex-col items-center gap-4">
                    <p class="text-2xl font-bold">{product.name}</p>
                    <p class="text-3xl font-extrabold">
                        {product.price}
                        {#if product.id}
                            <span class="text-lg font-normal">seat/mo</span>
                        {/if}
                    </p>

                    <div class="flex flex-col w-full gap-4">
                        <p>Features :</p>
                        {#each product.features as feature}
                            <p><span class="text-secondary-500 font-bold text-lg">✓</span> {feature}</p>
                        {/each}
                        <div></div>
                    </div>

                </div>
                <div class="flex flex-col gap-4">


                    <button class="btn variant-filled" on:click={()=> checkout(product.id)}>GET STARTED</button>
                </div>

            </div>
        {/each}
    </div>
</div>
