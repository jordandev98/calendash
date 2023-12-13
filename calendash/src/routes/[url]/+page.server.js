export async function load({params}) {
    const {url} = params;


    const res = await fetch(`${import.meta.env.VITE_API_URL}/user/page/${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (res.status > 299) {
        return {calendars : undefined}
    }
    const calendars = await res.json();

    return {
        calendars: calendars
    }
}