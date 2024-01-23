import {fetchPageByToken} from "../../../service/page/PageService.js";

export async function load({cookies}) {
    const token_id = cookies.get('token_id')
    if (token_id) {
       return await fetchPageByToken(token_id)
    }
}
