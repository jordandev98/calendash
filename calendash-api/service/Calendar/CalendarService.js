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
        const maxActiveCalendar = getMaxCalendarActiveFromSubscriptions(activeSub.planId);

        // udpate or not isActive if the subscription permits or not
        const isLimitReached = await isActiveCalendarReached(maxActiveCalendar, user._id);

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


const isActiveCalendarReached = async (maxActiveCalendar, userId) => {
    try {
        if (maxActiveCalendar === -1) {
            return false;
        }

        const pageModel = await PageModel.findOne({userId: userId}); // Fetch th
        if (!pageModel) {
            console.log("User not found or no PageModel associated with the user.");
            return; // Handle the case where the user or PageModel doesn't exist
        }

        const calendarIds = pageModel.calendars;

        const activeCalendars = await CalendarModel.find({
            _id: {$in: calendarIds},
            isActive: true,
        }).exec();


        return activeCalendars.length > maxActiveCalendar;
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

export const desactivateCalendars = async (userId , numberToKeep) => {

    try {
        const pageUserId = await PageModel.find({userId: userId}).findOne();

        const calendarsByUserId = pageUserId.calendars;

        for (let i = 0  ; i < calendarsByUserId.length - numberToKeep ; i++) {
            console.log(calendarsByUserId[i]);
            await CalendarModel.findByIdAndUpdate(calendarsByUserId[i] , {isActive: false});
        }
    }
    catch (e) {
        throw Error(e);
    }
}