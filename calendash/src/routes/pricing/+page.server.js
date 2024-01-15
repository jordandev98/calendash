export const actions = {
    checkoutUrl : async ({request}) =>  {
        const data = await request.formData();
        const id = data.get('id');
        const res = await fetch(`${import.meta.env.VITE_API_URL}/appointment/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await res.json()

    }
}