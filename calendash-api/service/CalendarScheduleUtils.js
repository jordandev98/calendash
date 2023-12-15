export const getFreeTime = (busyTimes, workingHours, timeZone) => {
    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0); // Set to the beginning of the week

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 90); // Set to the end of the week

    const availableSlots = {};

    const convertToTahitiTime = (date) => {
        return date.toLocaleString('en-US', { timeZone: timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', '');
    };

    for (let date = new Date(startOfWeek); date <= endOfWeek; date.setDate(date.getDate() + 1)) {
        const dateString = date.toISOString().split('T')[0];
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });

        if (workingHours.hasOwnProperty(day) && Array.isArray(workingHours[day]) && workingHours[day].length > 0) {
            const dayWorkingHours = workingHours[day];
            const dayStart = new Date(date);
            const dayEnd = new Date(date);

            dayStart.setHours(parseInt(dayWorkingHours[0].start.slice(0, 2)), parseInt(dayWorkingHours[0].start.slice(3)), 0, 0);
            dayEnd.setHours(parseInt(dayWorkingHours[dayWorkingHours.length - 1].end.slice(0, 2)), parseInt(dayWorkingHours[dayWorkingHours.length - 1].end.slice(3)), 0, 0);

            const todaySlots = [];
            let startSlot = dayStart.getTime();
            let endSlot = dayEnd.getTime();

            busyTimes.forEach(busyTime => {
                const busyStart = new Date(busyTime.start).getTime();
                const busyEnd = new Date(busyTime.end).getTime();

                if (busyEnd <= startSlot || busyStart >= endSlot) {
                    return;
                }

                if (busyStart > startSlot) {
                    todaySlots.push({
                        start: convertToTahitiTime(new Date(Math.max(startSlot, Date.now()))), // Ensuring start is not older than Date.now()
                        end: convertToTahitiTime(new Date(busyStart)),
                        timeZone: timeZone
                    });
                }

                startSlot = Math.max(startSlot, busyEnd);
            });
            if (startSlot < endSlot) {
                const now = Date.now();
                const roundedNow = new Date(Math.ceil(now / (15 * 60 * 1000)) * (15 * 60 * 1000));
                todaySlots.push({
                    start: convertToTahitiTime(new Date(startSlot)), // Ensuring start is not older than Date.now()
                    end: convertToTahitiTime(new Date(endSlot)),
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
