export const fetchActiveSubscriptions = async (token_id) => {
    if (token_id) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/subscription/active`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_id}`
            }
        });

        return await res.json()
    }

    return null;
}

export const fetchActiveQuantitySubscriptions = async (token_id) => {
    if (token_id) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/subscription/active/count`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_id}`
            }
        });

        return await res.json()
    }

    return null;
}