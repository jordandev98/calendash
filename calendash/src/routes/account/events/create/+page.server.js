import { goto } from "$app/navigation";

export const actions = {
    default : async ({request , cookies}) =>  {
        const data = await request.formData();
        console.log(data)

        const eventBody = {};

        for (const [key, value] of data.entries()) {
            eventBody[key] = value;
        }

        const token_id = cookies.get('token_id');

        const res =await fetch(`${import.meta.env.VITE_API_URL}/event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token_id}`
            },
            body : JSON.stringify(eventBody)
        });
        goto("/account")
        return await res.json()

    }
}