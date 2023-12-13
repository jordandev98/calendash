export const actions = {
    default : async ({request , cookies}) =>  {
        const data = await request.formData();
        console.log(data)

        const eventBody = {};

        for (const [key, value] of data.entries()) {
            eventBody[key] = value;
        }

        console.log(eventBody)
        const token_id = cookies.get('token_id');

        const res =await fetch(`${import.meta.env.VITE_API_URL}/event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_id}`
            },
            body : JSON.stringify(eventBody)
        });

        return await res.json()

    }
}