export const fetchPageByToken = async(token_id) => {
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
}