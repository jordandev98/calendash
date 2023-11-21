export const validateTimeFormat = (time) => {
    const timeFormat = /^(0[0-9]|1[0-9]|2[0-3]):(00|15|30|45)$/;
    return timeFormat.test(time);
}

export const checkOverlap = (hours) =>  {
    // Sort slots by start time
    hours.sort((a, b) => {
        return a.start.localeCompare(b.start);
    });

    for (let i = 0; i < hours.length - 1; i++) {
        const currentEndTime = hours[i].end;
        const nextStartTime = hours[i + 1].start;

        if (currentEndTime > nextStartTime) {
            return true; // Overlapping slots found
        }
    }

    return false; // No overlapping slots
}

export const isStartEndHoursInOrder = (hours) => {
    return hours.start < hours.end
}

export const checkIsCalendarValid = (calendar) => {
    console.log('Checking calendar')
    for (const [day, hours] of Object.entries(calendar.availability)) {
        // Check if time format is valid for each slot
        const invalidTimeFormat = hours.some(slot => !validateTimeFormat(slot.start) || !validateTimeFormat(slot.end));
        const invalidOrder = hours.some(slot => !isStartEndHoursInOrder(slot));

        if (invalidOrder) {
            console.log(hours)
            console.log(`Invalid time f`);
            return false
        }

        if (invalidTimeFormat) {
            console.log(`Invalid time format found for ${day}`);
            return false; // Time format is invalid
        }

        // Check for overlapping time slots for each day
        const overlapping = checkOverlap(hours);
        if (overlapping) {
            console.log(`Overlapping time slots found for ${day}`);
            return false; // Overlapping slots found
        }

        // Additional conditions can be added here if needed
        // e.g., checking for maximum slots, empty slots, etc.
    }

    return true; // Calendar is valid with no issues
};

export const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;

    if (hours > 0) {
        return `${formattedHours}h ${formattedMinutes} min`;
    }

    return `${formattedMinutes} min`;

}

export const timeOptions = [
    { value: '00:00', label: '00:00', keywords: '0000, 0' },
    { value: '00:15', label: '00:15', keywords: '0015, 15, 015' },
    { value: '00:30', label: '00:30', keywords: '0030, 30, 030' },
    { value: '00:45', label: '00:45', keywords: '0045, 45, 045' },
    { value: '01:00', label: '01:00', keywords: '0100, 100' },
    { value: '01:15', label: '01:15', keywords: '0115, 115' },
    { value: '01:30', label: '01:30', keywords: '0130, 130' },
    { value: '01:45', label: '01:45', keywords: '0145, 145' },
    { value: '02:00', label: '02:00', keywords: '0200, 200' },
    { value: '02:15', label: '02:15', keywords: '0215, 215' },
    { value: '02:30', label: '02:30', keywords: '0230, 230' },
    { value: '02:45', label: '02:45', keywords: '0245, 245' },
    { value: '03:00', label: '03:00', keywords: '0300, 300' },
    { value: '03:15', label: '03:15', keywords: '0315, 315' },
    { value: '03:30', label: '03:30', keywords: '0330, 330' },
    { value: '03:45', label: '03:45', keywords: '0345, 345' },
    { value: '04:00', label: '04:00', keywords: '0400, 400' },
    { value: '04:15', label: '04:15', keywords: '0415, 415' },
    { value: '04:30', label: '04:30', keywords: '0430, 430' },
    { value: '04:45', label: '04:45', keywords: '0445, 445' },
    { value: '05:00', label: '05:00', keywords: '0500, 500' },
    { value: '05:15', label: '05:15', keywords: '0515, 515' },
    { value: '05:30', label: '05:30', keywords: '0530, 530' },
    { value: '05:45', label: '05:45', keywords: '0545, 545' },
    { value: '06:00', label: '06:00', keywords: '0600, 600' },
    { value: '06:15', label: '06:15', keywords: '0615, 615' },
    { value: '06:30', label: '06:30', keywords: '0630, 630' },
    { value: '06:45', label: '06:45', keywords: '0645, 645' },
    { value: '07:00', label: '07:00', keywords: '0700, 700' },
    { value: '07:15', label: '07:15', keywords: '0715, 715' },
    { value: '07:30', label: '07:30', keywords: '0730, 730' },
    { value: '07:45', label: '07:45', keywords: '0745, 745' },
    { value: '08:00', label: '08:00', keywords: '0800, 800' },
    { value: '08:15', label: '08:15', keywords: '0815, 815' },
    { value: '08:30', label: '08:30', keywords: '0830, 830' },
    { value: '08:45', label: '08:45', keywords: '0845, 845' },
    { value: '09:00', label: '09:00', keywords: '0900, 900' },
    { value: '09:15', label: '09:15', keywords: '0915, 915' },
    { value: '09:30', label: '09:30', keywords: '0930, 930' },
    { value: '09:45', label: '09:45', keywords: '0945, 945' },
    { value: '10:00', label: '10:00', keywords: '1000, 1000' },
    { value: '10:15', label: '10:15', keywords: '1015, 1015' },
    { value: '10:30', label: '10:30', keywords: '1030, 1030' },
    { value: '10:45', label: '10:45', keywords: '1045, 1045' },
    { value: '11:00', label: '11:00', keywords: '1100, 1100' },
    { value: '11:15', label: '11:15', keywords: '1115, 1115' },
    { value: '11:30', label: '11:30', keywords: '1130, 1130' },
    { value: '11:45', label: '11:45', keywords: '1145, 1145' },
    { value: '12:00', label: '12:00', keywords: '1200, 1200' },
    { value: '12:15', label: '12:15', keywords: '1215, 1215' },
    { value: '12:30', label: '12:30', keywords: '1230, 1230' },
    { value: '12:45', label: '12:45', keywords: '1245, 1245' },
    { value: '13:00', label: '13:00', keywords: '1300, 1300' },
    { value: '13:15', label: '13:15', keywords: '1315, 1315' },
    { value: '13:30', label: '13:30', keywords: '1330, 1330' },
    { value: '13:45', label: '13:45', keywords: '1345, 1345' },
    { value: '14:00', label: '14:00', keywords: '1400, 1400' },
    { value: '14:15', label: '14:15', keywords: '1415, 1415' },
    { value: '14:30', label: '14:30', keywords: '1430, 1430' },
    { value: '14:45', label: '14:45', keywords: '1445, 1445' },
    { value: '15:00', label: '15:00', keywords: '1500, 1500' },
    { value: '15:15', label: '15:15', keywords: '1515, 1515' },
    { value: '15:30', label: '15:30', keywords: '1530, 1530' },
    { value: '15:45', label: '15:45', keywords: '1545, 1545' },
    { value: '16:00', label: '16:00', keywords: '1600, 1600' },
    { value: '16:15', label: '16:15', keywords: '1615, 1615' },
    { value: '16:30', label: '16:30', keywords: '1630, 1630' },
    { value: '16:45', label: '16:45', keywords: '1645, 1645' },
    { value: '17:00', label: '17:00', keywords: '1700, 1700' },
    { value: '17:15', label: '17:15', keywords: '1715, 1715' },
    { value: '17:30', label: '17:30', keywords: '1730, 1730' },
    { value: '17:45', label: '17:45', keywords: '1745, 1745' },
    { value: '18:00', label: '18:00', keywords: '1800, 1800' },
    { value: '18:15', label: '18:15', keywords: '1815, 1815' },
    { value: '18:30', label: '18:30', keywords: '1830, 1830' },
    { value: '18:45', label: '18:45', keywords: '1845, 1845' },
    { value: '19:00', label: '19:00', keywords: '1900, 1900' },
    { value: '19:15', label: '19:15', keywords: '1915, 1915' },
    { value: '19:30', label: '19:30', keywords: '1930, 1930' },
    { value: '19:45', label: '19:45', keywords: '1945, 1945' },
    { value: '20:00', label: '20:00', keywords: '2000, 2000' },
    { value: '20:15', label: '20:15', keywords: '2015, 2015' },
    { value: '20:30', label: '20:30', keywords: '2030, 2030' },
    { value: '20:45', label: '20:45', keywords: '2045, 2045' },
    { value: '21:00', label: '21:00', keywords: '2100, 2100' },
    { value: '21:15', label: '21:15', keywords: '2115, 2115' },
    { value: '21:30', label: '21:30', keywords: '2130, 2130' },
    { value: '21:45', label: '21:45', keywords: '2145, 2145' },
    { value: '22:00', label: '22:00', keywords: '2200, 2200' },
    { value: '22:15', label: '22:15', keywords: '2215, 2215' },
    { value: '22:30', label: '22:30', keywords: '2230, 2230' },
    { value: '22:45', label: '22:45', keywords: '2245, 2245' },
    { value: '23:00', label: '23:00', keywords: '2300, 2300' },
    { value: '23:15', label: '23:15', keywords: '2315, 2315' },
    { value: '23:30', label: '23:30', keywords: '2330, 2330' },
    { value: '23:45', label: '23:45', keywords: '2345, 2345' }
];



