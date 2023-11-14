<script>
    import {products} from "../../data/products.ts";
    import {goto} from "$app/navigation";
    import {getCheckoutUrl} from "../../service/stripe/stripePayment.ts";
    import {authStore} from "../../store/store.js";
    import {app, auth} from "../../service/firebase/firebase.js";

    const plans = products;

    const checkout = async (productId) => {
        let url = "/login"
        if ($authStore.user) {
            url = await getCheckoutUrl(app, auth.currentUser.uid, productId)
        }

        await goto(url)
    }
</script>

<div class="flex justify-center flex-col">
    <div class="grid grid-cols-1 px-16 py-8 gap-4 lg:grid-cols-3">
        {#each products as product}
            <div class="card flex flex-col p-8 gap-4 justify-between">
                <div class="flex flex-col items-center gap-4">
                    <p class="text-2xl font-bold">{product.name}</p>
                    <p class="text-3xl font-extrabold">{product.price}</p>
                </div>
                <div class="flex flex-col gap-4">
                    <p></p>
                    <button class="btn variant-filled" on:click={()=> checkout(product.id)}>GET STARTED</button>
                </div>

            </div>
        {/each}
    </div>
</div>
