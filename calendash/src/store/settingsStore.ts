import {writable} from 'svelte/store';
import {ScheduleEntry, UserCalendar, WeekDays} from "../data/userCalendar.ts";


export const initialUserData: UserCalendar =
    {
        url: '',
        calendars: [
            {
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
                events: [
                    {
                        id: undefined,
                        name: '',
                        duration: 30,
                        location: '',
                        imageUrl: '',
                    },
                ],
                email: '',
            },
        ],
    };

// Initialize your store with the initial calendar settings
export const settingsStore = writable<UserCalendar[]>([initialUserData])

export const addHours = (day: WeekDays, calendarNumber: number, pageNumber: number) => {
    settingsStore.update((settings) => {
        const updatedUserCalendars = [...settings];
        const dayArray =
            updatedUserCalendars[pageNumber].calendars[calendarNumber].schedule[day]; // Assuming it's always the first calendar

        const updatedSchedule = updateSchedule(dayArray);
        console.log(updatedSchedule);

        if (!dayArray || dayArray.length === 0) {
            updatedUserCalendars[pageNumber].calendars[calendarNumber].schedule[day] = updatedSchedule;
        } else {
            updatedUserCalendars[pageNumber].calendars[calendarNumber].schedule[day].push(...updatedSchedule);
        }

        return updatedUserCalendars;
    });
};

const updateSchedule = (dayArray: ScheduleEntry[]) => {
    if (!dayArray || dayArray.length === 0) {
        return [
            {
                start: '09:00', // You might set a default time here
                end: '17:00', // You might set a default time here
            },
        ];
    }

    const endValue = dayArray[dayArray.length - 1].end;
    const [defaultHour, defaultMinute] = endValue.split(':');
    const newEndHour = parseInt(defaultHour, 10) + 1;
    const newEnd = `${newEndHour}:${defaultMinute}`;

    return [{start: `${defaultHour}:${defaultMinute}`, end: newEnd}];
};

export const deleteHours = (day: WeekDays, i: number, calendarNumber: number, pageNumber: number) => {
    settingsStore.update((settings) => {
        const updatedSettings = JSON.parse(JSON.stringify(settings)); // Deep clone settings

        // Assuming it's always the first calendar
        const calendar = updatedSettings[pageNumber]?.calendars[calendarNumber];

        if (calendar) {
            const dayArray = calendar.schedule[day];

            if (dayArray && i >= 0 && i < dayArray.length) {
                dayArray.splice(i, 1);
            }
        }

        // Finally, return the updated cloned settings
        return updatedSettings;
    });
};