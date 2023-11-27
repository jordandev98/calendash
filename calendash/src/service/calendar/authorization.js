export const authorizeServiceAccount = async( accessToken , calendarId) => {
    try {
        const serviceAccountCredential = JSON.parse(import.meta.env.VITE_SERVICE_ACCOUNT_CREDENTIAL);
        console.log(serviceAccountCredential)
        const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/acl`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                role: 'writer', // Set appropriate access level (writer, reader, etc.)
                scope: {
                    type: 'user',
                    value: serviceAccountCredential.client_email, // Service account's email
                },
            }),
        });

        return response.ok;
    } catch (e) {
        return false;
    }

}