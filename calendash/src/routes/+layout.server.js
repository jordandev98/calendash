export async function load({cookies, localStorage}) {
    const token_id = cookies.get('token_id')
    if (token_id) {

        const res = await fetchCurrentUser(token_id);
        if (res.status === 200) {
            const user = await res.json()
            return {user}
        }

        if (res.status === 401) {
            const resTokens = await renewAccessToken(cookies.get('email'))
            if (resTokens.status === 200) {
                const tokens = await resTokens.json();
                console.log(tokens);
                cookies.set('token_id', tokens.access_token);
                const res = await fetchCurrentUser(tokens.id_token);
                const user = await res.json();
                return {user}
            } else {
                console.log('Failed to refresh token');
                return undefined;
            }

        }


        return {user: undefined};
    }
    return undefined;
}

const fetchCurrentUser = async (token_id) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/auth/currentUser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token_id}`
        }
    });
}

const renewAccessToken = async (email) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh_token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            redirect_url: `${import.meta.env.VITE_API_URL}/user`
        })
    });

}