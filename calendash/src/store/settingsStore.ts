import {writable} from 'svelte/store';
import type {ScheduleEntry, WeekDays} from "../data/userCalendar.ts";
import {CalendarEntry} from "../data/userCalendar.ts";


export const initialUserData = {
    name: "",
    calendarId : "",
    schedule: {
        Monday: [{start: '09:00', end: '17:00'}],
        Tuesday: [{start: '09:00', end: '17:00'}],
        Wednesday: [{start: '09:00', end: '17:00'}],
        Thursday: [{start: '09:00', end: '17:00'}],
        Friday: [{start: '09:00', end: '17:00'}],
        Saturday: [{start: '09:00', end: '17:00'}],
        Sunday: [],
    },
    timezone: 'Pacific/Tahiti',
    isValid: true,
    img : "",
    events: [],
};

export const settingsStore = writable(initialUserData);

export const addHours = (day: WeekDays) => {
    settingsStore.update((settings) => {
        const calendar = {...settings};
        const dayArray = calendar.schedule[day];
        const updatedSchedule = updateSchedule(dayArray);
        console.log(updatedSchedule);

        if (!dayArray || dayArray.length === 0) {
            calendar.schedule[day] = updatedSchedule;
        } else {
            calendar.schedule[day].push(...updatedSchedule);
        }

        return calendar;
    });
};

const updateSchedule = (dayArray: ScheduleEntry[]) => {
    if (!dayArray || dayArray.length === 0) {
        return [{
            start: '09:00', // You might set a default time here
            end: '17:00', // You might set a default time here
        }];
    }

    const endValue = dayArray[dayArray.length - 1].end;
    const [defaultHour, defaultMinute] = endValue.split(':');
    const newEndHour = parseInt(defaultHour, 10) + 1;
    const newEnd = `${newEndHour}:${defaultMinute}`;

    return [{start: `${defaultHour}:${defaultMinute}`, end: newEnd}];
};

export const deleteHours = (day: WeekDays, i: number) => {
    settingsStore.update((calendar) => {


        if (calendar) {
            const dayArray = calendar.schedule[day];

            if (dayArray && i >= 0 && i < dayArray.length) {
                dayArray.splice(i, 1);
            }
        }

        // Finally, return the updated cloned settings
        return calendar;
    });
};


export const updateIsValid = (isValid: boolean) => {
    settingsStore.update((settings) => {
        const calendar = {...settings}; // Clone the settings array

        if (calendar) {
            calendar.isValid = isValid;
        }

        return calendar; // Return the updated settings
    });
};
