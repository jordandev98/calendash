import {google} from "googleapis";
import {JWT} from 'google-auth-library';
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
        const calendar = await getCalendar()
        const calendarId = req.params.calendarId; // Replace with your calendar ID
        const event = req.body; // Event details from the request body

        // Insert the event
        const response = await calendar.events.insert({
            calendarId,
            requestBody: event,
        });

        res.json(response.data);
    } catch (err) {
        res.status(500).json({error: err});
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
        timeZone: workingSchedule.timeZone,
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
        const freeTime = getFreeTime(busyTimes, workingSchedule.workingHours , workingSchedule.timeZone)
        res.json(freeTime)
    });
}

