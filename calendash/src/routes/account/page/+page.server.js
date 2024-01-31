import {fetchPageByToken} from "../../../service/page/PageService.js";

export async function load({cookies}) {
    const token_id = cookies.get('token_id')
    if (token_id) {
        const response = await fetchPageByToken(token_id)
        return {page : response};

    }
    return undefined;
}


export const actions = {
    default : async ({request , cookies}) =>  {
        const data = await request.formData();
        const url = data.get('url');
        const token_id = cookies.get('token_id');

        const res =await fetch(`${import.meta.env.VITE_API_URL}/page`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_id}`
            },
            body : JSON.stringify({url : url})
        });

        return await res.json()

    }
}