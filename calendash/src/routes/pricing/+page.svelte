<script>
    import {products} from "../../data/products.ts";
    import {goto} from "$app/navigation";
    import {getCheckoutUrl} from "../../service/stripe/stripePayment.ts";
    import {authStore} from "../../store/store.js";
    import {RadioGroup, RadioItem} from "@skeletonlabs/skeleton";
    import {langStrings} from "../../text/langText.js";
    import {langStore} from "../../store/langStore.js";

    let isBilledMonthly = false;
    let quantity = 1;
    const checkout = async (productId) => {
        let url = "/login"
        if ($authStore.user && productId) {
            url = await getCheckoutUrl($authStore.user._id, productId, quantity)
        }


        await goto(url)
    }
</script>


<div class="flex justify-center flex-col w-11/12 self-center mt-8">
    <div class="max-w-md self-center w-full">
        <RadioGroup active="variant-filled" hover="hover:variant-soft" border="border-none" display="flex"
                    padding="py-1 px-1">
            <RadioItem bind:group={isBilledMonthly} name="captype" value={true}>
                <span>{langStrings[$langStore]["billedMonthly"]}</span></RadioItem>
            <RadioItem bind:group={isBilledMonthly} name="captype" value={false}>
                <span>{langStrings[$langStore]["billedYearly"]} <span class="badge text-md">- 20%</span></span>
            </RadioItem>
        </RadioGroup>

    </div>


    <div class="grid grid-cols-1 py-8 gap-4 sm:grid-cols-2 lg:grid-cols-3">


        {#each products as product}
            <div class="flex flex-col p-8 justify-between border gap-2 rounded-xl bg-gray-50 shadow hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-md">
                <div class="flex flex-col items-center gap-4">
                    <p class="text-2xl font-bold">{product.name[$langStore]}</p>
                    <p class="text-3xl font-extrabold">

                        {isBilledMonthly ? product.price[$langStore] : product.annualPrice[$langStore]}
                        {#if product.id}
                            <span class="text-surface-500 text-xl">/mo</span>
                        {/if}

                    </p>


                    <div class="flex flex-col w-full gap-4">
                        {#each product.features[$langStore] as feature}
                            <p><span class="text-secondary-500 font-bold text-lg">✓</span> {feature}</p>
                        {/each}
                        <div></div>
                    </div>

                </div>
                <div class="flex flex-col gap-4">
                    <button class="btn variant-filled"
                            on:click={()=> checkout(isBilledMonthly ? product.id : product.annualId)}>GET STARTED
                    </button>
                </div>

            </div>
        {/each}
    </div>
</div>
