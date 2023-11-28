import express from "express";
import {getEvents, getFreeTimes, insertEvent, setUpWorkingHours} from "../service/CalendarService.js";

const calendarController = express.Router();

// calendarController.get("/:calendarId", getCalendar)
calendarController.get("/event/:calendarId", getEvents)
calendarController.post("/event/:calendarId", insertEvent)
calendarController.put("/workingHours/:calendarId", setUpWorkingHours)
calendarController.post("/event/timeslots/:calendarId", getFreeTimes)

export default calendarController