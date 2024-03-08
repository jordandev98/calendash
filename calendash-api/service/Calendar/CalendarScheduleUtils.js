export const getFreeTime = (busyTimes, workingHours, timeZone) => {
    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0); // Set to the beginning of the week

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 90); // Set to the end of the week

    const availableSlots = {};


    for (let date = new Date(startOfWeek); date <= endOfWeek; date.setDate(date.getDate() + 1)) {
        const dateString = date.toISOString().split('T')[0];
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });

        if (workingHours.hasOwnProperty(day) && Array.isArray(workingHours[day]) && workingHours[day].length > 0) {
            const dayWorkingHours = workingHours[day];
            const dayStart = new Date(date);
            const dayEnd = new Date(date);

            dayStart.setHours(parseInt(dayWorkingHours[0].start.slice(0, 2)), parseInt(dayWorkingHours[0].start.slice(3)), 0, 0);
            dayEnd.setHours(parseInt(dayWorkingHours[dayWorkingHours.length - 1].end.slice(0, 2)), parseInt(dayWorkingHours[dayWorkingHours.length - 1].end.slice(3)), 0, 0);


            let startSlot = dayStart.getTime();
            let endSlot = dayEnd.getTime();

            console.log(dayStart , dayEnd)
            const todaySlots = getTimeSlots(busyTimes , startSlot , endSlot , timeZone);
            if (startSlot < endSlot) {
                const now = Date.now();
                const roundedNow = new Date(Math.ceil(now / (15 * 60 * 1000)) * (15 * 60 * 1000));
                todaySlots.push({
                    start: convertToTimeZone(new Date(startSlot) , timeZone), // Ensuring start is not older than Date.now()
                    end: convertToTimeZone(new Date(endSlot) , timeZone),
                    timeZone: timeZone
                });
            }

            availableSlots[dateString] = todaySlots;
        } else {
            availableSlots[dateString] = [];
        }
    }

    return availableSlots;
};


export const convertToTimeZone = (date , timeZone) => {
    try {
        return date.toLocaleString('en-US', { timeZone: timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', '');
    }
    catch (err) {

    }

};

export const getTimeSlots = (busyTimes , startSlot , endSlot , timeZone) => {
    const todaySlots = [];

    busyTimes.forEach(busyTime => {
        const busyStart = new Date(busyTime.start).getTime();
        const busyEnd = new Date(busyTime.end).getTime();

        if (busyEnd <= startSlot || busyStart >= endSlot) {
            return;
        }

        if (busyStart > startSlot) {
            todaySlots.push({
                start: convertToTimeZone(new Date(Math.max(startSlot, Date.now())), timeZone), // Ensuring start is not older than Date.now()
                end: convertToTimeZone(new Date(busyStart) , timeZone),
                timeZone: timeZone
            });
        }

        startSlot = Math.max(startSlot, busyEnd);
    });

    return todaySlots;
}
