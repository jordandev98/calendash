import { writable } from 'svelte/store';

// Initialize your store with the initial calendar settings
export const settingsStore = writable({
    url: "",
    hoursFormat: 24,
    calendars: [
        {
            availability: {
                "Monday": [{start: "09:00", end: "17:00"}],
                "Tuesday": [{start: "09:00", end: "17:00"}],
                "Wednesday": [{start: "09:00", end: "17:00"}],
                "Thursday": [{start: "09:00", end: "17:00"}],
                "Friday": [{start: "09:00", end: "17:00"}],
                "Saturday": [{start: "09:00", end: "17:00"}],
                "Sunday": [],
            },
            timezone: "Pacific/Honolulu",
        },
    ]
});


export const addHours = (day , calendarNumber) => {
    settingsStore.update(settings => {
        const updatedCalendars = [...settings.calendars];
        const dayArray = updatedCalendars[calendarNumber].availability[day];

        // If the array for the day is empty, create the initial entry
        if (!dayArray || dayArray.length === 0) {
            updatedCalendars[calendarNumber].availability[day] = [{
                start: "9:00", // You might set a default time here
                end: "17:00", // You might set a default time here
            }];
            return { ...settings, calendars: updatedCalendars };
        }

        // Continue with adding an hour if the array already exists for the day
        const endValue = dayArray[dayArray.length-1].end;
        const [defaultHour, defaultMinute] = endValue.split(":");
        const newEndHour = parseInt(defaultHour, 10) + 1;
        const newEnd = `${newEndHour}:${defaultMinute}`;

        dayArray.push({ start: `${defaultHour}:${defaultMinute}`, end: newEnd });
        return { ...settings, calendars: updatedCalendars };
    });
}

export const deleteHours = (day , i , calendarNumber)=> {
    settingsStore.update(settings => {
        const updatedCalendars = [...settings.calendars];
        const dayArray = updatedCalendars[calendarNumber].availability[day];
        if (i >= 0 && i < dayArray.length) {
            dayArray.splice(i, 1);
            return {...settings, calendars: updatedCalendars};
        } else {
            console.log("Invalid index for the specified day's array.");
            return settings;
        }
    });
}