import {google} from "googleapis";
import {JWT} from 'google-auth-library';
import fetch from "node-fetch";
import {getFreeTime} from "./CalendarScheduleUtils.js";

const createJwt = async () => {
    const serviceAccountCredential = JSON.parse(process.env.SERVICE_ACCOUNT_CREDENTIAL);
    // Create the JWT header
    const jwtClient = new JWT({
        email: serviceAccountCredential.client_email,
        key: serviceAccountCredential.private_key,
        scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    await jwtClient.authorize();
    return jwtClient;

}

export const getCalendar = async () => {
    const jwtClient = await createJwt(); // Implement this function to create the JWT client
    return google.calendar({
        version: 'v3',
        auth: jwtClient,
    });
}

export const getEvents = async (req, res) => {
    try {
        const calendar = await getCalendar()

        const calendarId = req.params.calendarId; // Replace with your calendar ID
        const events = await calendar.events.list({
            calendarId,
            timeMin: new Date().toISOString(), // Fetch events starting from current time
            maxResults: 10, // Specify the maximum number of events to fetch
            singleEvents: true,
            orderBy: 'startTime',
        });

        res.json(events.data.items);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const insertEvent = async (req, res) => {
    try {
        const serviceAccountCredential = JSON.parse(process.env.SERVICE_ACCOUNT_CREDENTIAL);
        const calendarId = "oo.jordanlee@gmail.com"
        const accessToken = "ya29.a0AfB_byCfcvdtQHLAj-y4pntz0g0o5Bv-jcEMoLLZrE_QM0Tp6WU0aay9TvtT5tCJz86x5J4iVK8UaKU9nNiOdJECu5TfjWaJH8rBDSutNaYAxM_rdhx1s7gjsMkU76Lsr5FbcwpidMmVaHoG8QpMIiiS8eQ6zWmkFoAaCgYKAYISARMSFQHGX2MiPNIradLr-qHnunNVaxU6cA0170"
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

        if (response.ok) {
            console.log('Calendar shared successfully!');
            // Handle success
        } else {
            console.error('Failed to share calendar:', response.statusText);
            // Handle error
        }
    } catch (error) {
        console.error('Error:', error.message);
        // Handle error
    }
}

export const setUpWorkingHours = async (req, res) => {
    try {
        const workingHours = req.body;
        const calendarId = req.params.calendarId;
        const calendar = await getCalendar();

        const resCalendar = await calendar.calendars.update({
            calendarId: calendarId,
            resource: workingHours,
        }, () => {
        });
        res.json(resCalendar)
    } catch (err) {
        res.status(500).json({error: err});
    }


}

export const getFreeTimes = async (req, res) => {
    const calendarId = req.params.calendarId;
    const workingSchedule = req.body;
    const calendar = await getCalendar();
    const start = new Date().toISOString();
    const end = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const query = {
        timeMin: start,
        timeMax: end,
        timeZone: 'Tahiti/Pacific',
        items: [{id: calendarId}],
    };

    // Get free/busy information
    await calendar.freebusy.query({requestBody: query}, (err, response) => {
        if (err) {
            console.error('Error querying free/busy:', err);
            return;
        }

        const busyTimes = response.data.calendars[calendarId].busy;
        console.log(busyTimes)
        const freeTime = getFreeTime(busyTimes, workingSchedule.workingHours)
        res.json(freeTime)
    });
}

