import {goto} from "$app/navigation";

export const load = (async ({cookies}) => {
    const token_id = cookies.get('token_id')
    if (token_id) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/page`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_id}`
            }
        });

        return {page: await res.json()}
    }
    return null;

})

export const actions = {
    deleteEvent: async ({cookies, request}) => {
        const token_id = cookies.get('token_id')
        const data = await request.formData();
        const eventId = data.get('event_id')
        console.log(eventId)
        if (token_id) {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/event/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token_id}`
                }
            });


        }
    },

    saveEvent: async ({request, cookies}) => {
        const data = await request.formData();
        console.log(data)

        const eventBody = {};

        for (const [key, value] of data.entries()) {
            eventBody[key] = value;
        }

        const token_id = cookies.get('token_id');

        const res = await fetch(`${import.meta.env.VITE_API_URL}/event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_id}`
            },
            body: JSON.stringify(eventBody)
        });
        goto("/account")
        return await res.json()

    }
}

