export async function load({cookies, params}) {
    const token_id = cookies.get('token_id')
    const {url} = params
    const res = await fetch(`${import.meta.env.VITE_API_URL}/calendar/${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token_id}`
        }
    });

    return {calendar: await res.json(), token_id: token_id}

}

