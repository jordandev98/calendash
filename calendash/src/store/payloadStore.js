import {writable} from "svelte/store";

export const payloadStore = writable({
    "img" : undefined,
    "name" : undefined,
    "calendarId" : undefined,
    "timeZone" : undefined,
    "payload" : {
        "_id" : undefined,
        "summary": "",
        "location": "",
        "description": "",
        "pageId" : undefined,
        "start": {
            "dateTime": undefined,
            "timeZone": ""
        },
        "end": {
            "dateTime": undefined,
            "timeZone": ""
        },
        "reminders": {
            "useDefault": true
        },
        "organizer": {
            "email": "",
            "displayName": ""
        },
    },
    "duration" : -1,
})
