import express from "express";
import {decodeUser, getGoogleAuth, verifyCalendarOwnership} from "../middleware/authenticationMiddleware.js";
import {
    addNewCalendarToGoogle,
    authorizeServiceAccount,
    getEvents,
    getFreeTimes,
    listGoogleCalendars,
    setUpWorkingHours
} from "../service/Calendar/GoogleCalendarService.js";
import {addCalendarToUser, getCalendarbyId, updateCalendarById} from "../service/Calendar/CalendarService.js";
import {deleteImage, uploadFile} from "../service/AwsS3/s3.js";
import CalendarModel from "../model/CalendarModel.js";
import multer from "multer";

const calendarController = express.Router();

calendarController.get("/event/:calendarId", getEvents)
calendarController.post("/authorize", authorizeServiceAccount)
calendarController.put("/workingHours/:calendarId", setUpWorkingHours)
calendarController.post("/event/timeslots/:calendarId", getFreeTimes)
calendarController.post("/add", decodeUser, addCalendarToUser)
calendarController.post("/google/add", decodeUser, getGoogleAuth, addNewCalendarToGoogle)
calendarController.put("/:calendarId", verifyCalendarOwnership, updateCalendarById)

calendarController.get("/:calendarId", getCalendarbyId)
calendarController.get("/google/list", decodeUser, getGoogleAuth, listGoogleCalendars)
calendarController.post("/image/:calendarId", decodeUser, multer().single("file"), async function (req, res, newt) {
    try {

        const {calendarId} = req.params;
        const files = req.file
        const parentFolder = "calendars/";

        const oldCalendar = await CalendarModel.findById(calendarId);
        if (oldCalendar.img) {
            await deleteImage(oldCalendar.img)
        }

        await uploadFile(files, 480, 480, parentFolder + calendarId)

        const newCalendar = await CalendarModel.findByIdAndUpdate(calendarId,
            {img: `${parentFolder + calendarId}/${files.originalname}`}, {new: true});


        res.status(201).json(newCalendar)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err});
    }
})

export default calendarController