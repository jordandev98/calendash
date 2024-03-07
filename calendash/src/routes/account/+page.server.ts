// @ts-ignore
import type {PageServerLoad} from './$types';
import {fetchPageByToken} from "../../service/page/PageService";

export const load = (async ({cookies}) => {
    const token_id = cookies.get('token_id');
    return {page : await fetchPageByToken(token_id) , token_id : token_id}

}) satisfies PageServerLoad;


export const actions = {

    shareCalendar: async ({request, cookies}) => {
        const data = await request.formData();
        const emailToShare = data.get("email");
        const calendarId = data.get("calendarId");
        const token_id = cookies.get('token_id');

        const res= await fetch(`${import.meta.env.VITE_API_URL}/calendar/share/${calendarId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_id}`
            },
            body: JSON.stringify({
                email : emailToShare
            })
        });

    }
}
