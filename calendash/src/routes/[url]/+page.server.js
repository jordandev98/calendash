import {fetchPageByToken} from "../../service/page/PageService.js";

export async function load({params}) {
    const {url} = params;


    const res = await fetch(`${import.meta.env.VITE_API_URL}/page/${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return {
        page: await res.json()
    }

}
