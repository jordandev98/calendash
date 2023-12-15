import express from "express";
import {
    addCalendarToUser,
    authorizeServiceAccount,
    getEvents,
    getFreeTimes,
    setUpWorkingHours,
    updateCalendarById
} from "../service/CalendarService.js";
import {decodeUser, verifyCalendarOwnership} from "../middleware/authenticationMiddleware.js";

const calendarController = express.Router();

// calendarController.get("/:calendarId", getCalendar)
calendarController.get("/event/:calendarId", getEvents)
calendarController.post("/authorize", authorizeServiceAccount)
calendarController.put("/workingHours/:calendarId", setUpWorkingHours)
calendarController.post("/event/timeslots/:calendarId", getFreeTimes)
calendarController.post("/add", decodeUser, addCalendarToUser)
calendarController.put("/:calendarId", verifyCalendarOwnership, updateCalendarById)

export default calendarController