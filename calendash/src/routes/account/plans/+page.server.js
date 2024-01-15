export async function load({cookies}) {
    const token_id = cookies.get('token_id')
    if (token_id) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/subscription`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_id}`
            }
        });

        return {subscriptions : await res.json()}
    }
    return null;

}