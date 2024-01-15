import {stripe} from "./stripe";
import {goto} from "$app/navigation";

export const getCheckoutUrl = async (userId: string, priceId: string): Promise<string> => {

    if (!userId) throw new Error("User is not authenticated");

    const res = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price: priceId,
            quantity: 1,
        }],
        mode: 'subscription',
        success_url: `${import.meta.env.VITE_BASE_URL}/account/plans`,
        cancel_url: `${import.meta.env.VITE_BASE_URL}/pricing`,
        client_reference_id: userId,
    })


    return res.url
};


export const getPortalUrl = async (customerId: string): Promise<string> => {
    try {
        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url:`${import.meta.env.VITE_BASE_URL}/account/plans`
        })

        return session.url

    } catch (error) {
        console.error(error);
    }
};