import {OAuth2Client} from "google-auth-library";
import {VITE_CALENDAR_CLIENT_ID, VITE_CALENDAR_CLIENT_SECRET} from "$env/static/private";
import {redirect} from "@sveltejs/kit";

export const GET = async ({url , cookies}) => {
    const redirectUrl = `${import.meta.env.VITE_BASE_URL}/oauth`
    const code = url.searchParams.get('code');

    try{
        const oAuth2Client = new OAuth2Client(
            VITE_CALENDAR_CLIENT_ID,
            VITE_CALENDAR_CLIENT_SECRET,
            redirectUrl
        )

        const res = await oAuth2Client.getToken(code)
        oAuth2Client.setCredentials(res.tokens)
        const user = oAuth2Client.credentials;
        cookies.set(
            'token_id', user.id_token,
            {
                path: '/',
                maxAge: 60 * 60 * 24 * 365,
                httpOnly: false, // <-- if you want to read it in the browser
            },
        );
        await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.id_token}`
            },
            body : JSON.stringify({refresh_token : user.refresh_token})
        });
    }catch(error){
        console.log(error)
    }
    throw redirect(303 , "/account")
}