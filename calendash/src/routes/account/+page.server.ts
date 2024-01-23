// @ts-ignore
import type {PageServerLoad} from './$types';
import {fetchPageByToken} from "../../service/page/PageService";

export const load = (async ({cookies}) => {
    const token_id = cookies.get('token_id')
    return await fetchPageByToken(token_id)

}) satisfies PageServerLoad;
