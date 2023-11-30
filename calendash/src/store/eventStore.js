import {writable} from "svelte/store";

export const eventStore = writable({
    "payload" : {
        "summary": "",
        "location": "",
        "description": "",
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
