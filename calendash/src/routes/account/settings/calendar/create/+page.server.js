export async function load({cookies, localStorage}) {
    const token_id = cookies.get('token_id')
    return {token_id}
}