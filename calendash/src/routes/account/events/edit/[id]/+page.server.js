export async function load({params, cookies}) {
    const {id} = params;
    const token_id = cookies.get('token_id')

    if (token_id) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/event/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_id}`
            }
        });
        if (res.status > 299) {
            return {event: undefined}
        }
        const resEvent = await res.json();

        return {
            event: resEvent
        }
    }
    return {event: undefined}
}


export const actions = {

    saveEvent: async ({request, cookies}) => {
        const data = await request.formData();
        const eventId = data.get("_id")
        const eventBody = {};

        for (const [key, value] of data.entries()) {
            eventBody[key] = value;
        }

        const token_id = cookies.get('token_id');

        const res = await fetch(`${import.meta.env.VITE_API_URL}/event/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_id}`
            },
            body: JSON.stringify(eventBody)
        });
        return await res.json()

    }
}



