import {OAuth2Client} from "google-auth-library";
// @ts-ignore
import {VITE_CALENDAR_CLIENT_SECRET , VITE_CALENDAR_CLIENT_ID} from "$env/static/private";
import {redirect} from "@sveltejs/kit";

export const actions = {
    OAuth2: async ({}) => {
        const redirectUrl = `${import.meta.env.VITE_BASE_URL}/oauth`

        const oAuth2Client = new OAuth2Client(
            VITE_CALENDAR_CLIENT_ID,
            VITE_CALENDAR_CLIENT_SECRET,
            redirectUrl
        )

        const authorizedUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/calendar',
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
                // Add other scopes as needed
            ],
            prompt: "consent"
        })

        throw redirect(302 , authorizedUrl)
    }



}