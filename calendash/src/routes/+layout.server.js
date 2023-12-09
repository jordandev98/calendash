import {authStore} from "../store/store.js";

export async function load ({cookies}) {
    const token_id = cookies.get('token_id')
    if (token_id) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/currentUser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_id}`
            }
        });
        const user = await res.json()
        return {user}
    }
    return undefined;
}