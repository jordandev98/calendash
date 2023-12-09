import express from "express";
import {
    addCalendarToUser,
    authorizeServiceAccount,
    getEvents,
    getFreeTimes,
    insertEvent,
    setUpWorkingHours
} from "../service/CalendarService.js";

const calendarController = express.Router();

// calendarController.get("/:calendarId", getCalendar)
calendarController.get("/event/:calendarId", getEvents)
calendarController.post("/event/:calendarId", insertEvent)
calendarController.post("/authorize", authorizeServiceAccount)
calendarController.put("/workingHours/:calendarId", setUpWorkingHours)
calendarController.post("/event/timeslots/:calendarId", getFreeTimes)
calendarController.post("/add/:userId" , addCalendarToUser)

export default calendarController