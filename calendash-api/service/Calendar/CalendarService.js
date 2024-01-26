import CalendarModel from "../../model/CalendarModel.js";
import {getUserByDecodedUser} from "../Auth/AuthUtils.js";
import PageModel from "../../model/PageModel.js";


export const addCalendarToUser = async (req, res) => {
    try {
        const user = await getUserByDecodedUser(req.decodedUser)

        const newCalendar = new CalendarModel(req.body);

        await newCalendar.save()

        const page = await PageModel.findByIdAndUpdate({_id: user.pageId}, {$push: {calendars: newCalendar._id}}, {new: true})

        res.status(200).json({message: page});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server Error'});
    }
};

const createOrUpdateCalendar = async ({calendarId, name, img, schedule, timezone}) => {
    const updatedCalendar = await CalendarModel.findOneAndUpdate(
        {calendarId},
        {$set: {name, img, schedule, timezone}},
        {new: true, upsert: true} // Creates a new document if it doesn't exist
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


export const updateCalendarById = async (req, res) => {
    const {calendarId} = req.params;

    if (!req.page.calendars.find(calendar => calendar._id.toString() === calendarId)) {
        return res.status(403).json({message : "You don't have access to this object"})
    }

    try {
        const newCalendar = await CalendarModel.findById(calendarId)

        newCalendar.schedule = req.body.schedule;
        newCalendar.name = req.body.name;

        newCalendar.save();

        res.json({message: "Calendar saved successfully", newCalendar})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const getCalendarbyId = async (req, res) => {
    const {calendarId} = req.params
    try {
        const calendar = await CalendarModel.findById(calendarId)
        res.json(calendar)
    } catch (error) {
        res.status(500).json({message: error})
    }
}
