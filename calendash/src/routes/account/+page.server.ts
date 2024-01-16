import type {PageServerLoad} from './$types';

export const load = (async ({cookies}) => {
    const token_id = cookies.get('token_id')
    if (token_id) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/event`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_id}`
            }
        });

        return {events: await res.json()}
    }
    return null;

}) satisfies PageServerLoad;
