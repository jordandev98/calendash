import CalendarModel from "../../model/CalendarModel.js";
import {getUserByDecodedUser} from "../Auth/AuthUtils.js";
import PageModel from "../../model/PageModel.js";
import {
    findActiveSubscriptionsByUserId,
    getMaxCalendarActiveFromSubscriptions
} from "../Payment/SubscriptionService.js";


export const addCalendarToUser = async (req, res) => {
    try {
        const user = await getUserByDecodedUser(req.decodedUser)

        const newCalendar = new CalendarModel(req.body);

        await newCalendar.save();

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

export const updateCalendarById = async (req, res) => {
    const {calendarId} = req.params;

    try {
        const newCalendar = await CalendarModel.findByIdAndUpdate(calendarId, req.body);

        res.json({message: "Calendar saved successfully", newCalendar})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const updateIsActiveById = async (req, res) => {
    const {calendarId} = req.params;
    try {
        console.log(req.body.isActive)
        if (!req.body.isActive) {
            const newCalendar = await CalendarModel.findByIdAndUpdate(calendarId, req.body);
            res.json({message: "Calendar saved successfully", newCalendar})
            return;
        }
        // Read user
        const user = await getUserByDecodedUser(req.decodedUser)
        // Read subscriptions
        const activeSub = await findActiveSubscriptionsByUserId(user._id);

        // count the number of calendar where isActive = true
        const maxActiveCalendar = getMaxCalendarActiveFromSubscriptions(activeSub);

        const activesCalendars = await getAllActiveCalendarsByUserId(user._id);

        // udpate or not isActive if the subscription permits or not
        const isLimitReached = await isActiveCalendarReached(maxActiveCalendar, activesCalendars);


        if (isLimitReached) {
            res.status(400).json({
                message: "You have reached the maximum active calendar. Please upgrade your subscription"
            });
            return
        }

        const newCalendar = await CalendarModel.findByIdAndUpdate(calendarId, req.body);

        res.json({message: "Calendar saved successfully", newCalendar})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const getAllActiveCalendarsByUserId = async (userId) => {
    const pageModel = await PageModel.findOne({userId: userId}); // Fetch th
    if (!pageModel) {
        console.log("User not found or no PageModel associated with the user.");
        return; // Handle the case where the user or PageModel doesn't exist
    }

    const calendarIds = pageModel.calendars;

    return await CalendarModel.find({
        _id: {$in: calendarIds},
        isActive: true,
    }).exec();
}


const isActiveCalendarReached = async (maxActiveCalendar, activeCalendars) => {
    try {
        if (maxActiveCalendar === -1) {
            return false;
        }


        return activeCalendars.length + 1> maxActiveCalendar;
    } catch (error) {
        console.log(error)
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

export const desactivateCalendars = async (activeCalendars , numberToKeep) => {

    try {
        for (let i = numberToKeep  ; i < activeCalendars.length ; i++) {
            await CalendarModel.findByIdAndUpdate(activeCalendars[i] , {isActive: false});
        }
    }
    catch (e) {
        throw Error(e);
    }
}