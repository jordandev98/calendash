import {fetchPageByToken} from "../../../service/page/PageService.js";
import {fetchActiveQuantitySubscriptions, fetchActiveSubscriptions} from "../../../service/stripe/getPaymentStatus.ts";

export async function load({cookies}) {
    const token_id = cookies.get('token_id')
    if (token_id) {
        const pageRes = await fetchPageByToken(token_id)
        const activeSubscriptionsRes = await fetchActiveQuantitySubscriptions(token_id)


        return {page : pageRes, activeSubscriptions : activeSubscriptionsRes}
    }
}

