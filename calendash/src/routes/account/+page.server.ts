// @ts-ignore
import type {PageServerLoad} from './$types';
import {fetchPageByToken} from "../../service/page/PageService";

export const load = (async ({cookies}) => {
    const token_id = cookies.get('token_id');
    return {page : await fetchPageByToken(token_id) , token_id : token_id}

}) satisfies PageServerLoad;
