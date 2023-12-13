export const actions = {
    default : async ({request , cookies}) =>  {
        const data = await request.formData();
        const url = data.get('url');
        console.log(url)
        const token_id = cookies.get('token_id');

        const res =await fetch(`${import.meta.env.VITE_API_URL}/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_id}`
            },
            body : JSON.stringify({url : url})
        });

        return await res.json()

    }
}