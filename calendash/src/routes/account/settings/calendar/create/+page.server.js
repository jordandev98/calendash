export async function load({cookies}) {
    const token_id = cookies.get('token_id')
    const res= await fetch(`${import.meta.env.VITE_API_URL}/calendar/google/list`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token_id}`
        }
    });

    return {calendars : await res.json() , token_id : token_id}

}


export const actions = {

    newGoogleCalendar: async ({request, cookies}) => {
        const data = await request.formData();
        const token_id = cookies.get('token_id')
        const email = cookies.get('email')
        const summary = data.get('summary')
        const clientCurrentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    }
}



