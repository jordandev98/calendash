import {google} from "googleapis";
import {JWT} from 'google-auth-library';
import {getFreeTime} from "./CalendarScheduleUtils.js";
import fetch from "node-fetch";
import {createUserIfNotExists, findUserByUid} from "./User/UserService.js";
import UserModel from "../model/UserModel.js";
import CalendarModel from "../model/CalendarModel.js";
import AppointmentModel from "../model/AppointmentModel.js";

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

export const authorizeServiceAccount = async (req, res) => {
    try {
        //Maybe the calendarId which is the email of google account cannot exists
        const {calendarId, accessToken, userId , email , provider} = req.body;
        const serviceAccountCredential = JSON.parse(process.env.SERVICE_ACCOUNT_CREDENTIAL);
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
            await createUserIfNotExists(userId , provider , email)
            res.status(response.status).send('Authorized successfully.');
            return
        }
        res.status(response.status).send('Authorization failed.');

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

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
    const now = new Date();
    const start = now.toISOString();
    now.setMonth(now.getMonth() + 3);
    const end = now.toISOString();

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
        const freeTime = getFreeTime(busyTimes, workingSchedule.workingHours, workingSchedule.timeZone)
        res.json(freeTime)
    });
}


export const addCalendarToUser = async (req, res) => {
    try {
        const { email } = req.decodedUser;
        const { calendarId, name, img, schedule, timezone } = req.body;

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let calendar = await createOrUpdateCalendar({ calendarId, name, img, schedule, timezone });


        await addUserCalendar(user, calendar._id);
        res.status(200).json({ message: 'Calendar added/updated for user' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const createOrUpdateCalendar = async ({ calendarId, name, img, schedule, timezone }) => {
    const updatedCalendar = await CalendarModel.findOneAndUpdate(
        { calendarId },
        { $set: { name, img, schedule, timezone } },
        { new: true, upsert: true } // Creates a new document if it doesn't exist
    );

    if (!updatedCalendar.events) {
        updatedCalendar.events = []; // Assuming events are empty initially
        await updatedCalendar.save();
    }

    return updatedCalendar;
};
const addUserCalendar = async (user, calendarId) => {
    if (!user.calendars.includes(calendarId)) {
        user.calendars.push(calendarId);
        await user.save();
    }
};


export const updateCalendarById = async( req, res) => {
    const {_id} = req.body

    try {
        const newCalendar = await CalendarModel.findByIdAndUpdate(_id , req.body , {new : true})
        res.json({message : "Calendar saved successfully" , newCalendar})
    }
    catch(error) {
        res.status(500).json({message : error})
    }
}

