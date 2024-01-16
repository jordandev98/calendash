export const actions = {
    deleteEvent: async ({cookies , request}) => {
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
    }
};