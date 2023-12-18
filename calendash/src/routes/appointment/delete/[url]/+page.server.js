export async function load({params}) {
    const {url} = params;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/appointment/${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (res.status > 299) {
        return {appointment : undefined}
    }
    const appointment = await res.json();
    return {
        appointment
    }
}

export const actions = {
    default : async ({request}) =>  {
        const data = await request.formData();
        const id = data.get('id');
        const res =await fetch(`${import.meta.env.VITE_API_URL}/appointment/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await res.json()

    }
}