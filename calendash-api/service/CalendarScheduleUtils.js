// Helper function to convert time to minutes
const timeToMinutes = time => time.split(':').reduce((acc, time) => (60 * acc) + +time);

// Helper function to convert date to minutes
const dateToMinutes = date => new Date(date).getHours() * 60 + new Date(date).getMinutes();

// Function to convert working hours to minutes
const convertWorkingHoursToMinutes = workingHours => {
    const workingHoursInMinutes = {};
    for (const day in workingHours) {
        workingHoursInMinutes[day] = workingHours[day].map(timeSlot => ({
            startTime: timeToMinutes(timeSlot.startTime),
            endTime: timeToMinutes(timeSlot.endTime)
        }));
    }
    return workingHoursInMinutes;
};

// Function to convert busy times to minutes
const convertBusyTimesToMinutes = busyTimes => busyTimes.map(timeSlot => ({
    start: dateToMinutes(timeSlot.start),
    end: dateToMinutes(timeSlot.end)
}));

// Main function to get free time
export const getFreeTime = (busyTimes, workingHours) => {
    const freeTimes = [];
    const workingHoursInMinutes = convertWorkingHoursToMinutes(workingHours);
    const busyTimesInMinutes = convertBusyTimesToMinutes(busyTimes);

    for (const day in workingHoursInMinutes) {
        for (const timeSlot of workingHoursInMinutes[day]) {
            let slotStart = timeSlot.startTime;

            for (const busyTime of busyTimesInMinutes) {
                if (busyTime.start <= slotStart && busyTime.end >= slotStart) {
                    slotStart = busyTime.end;
                }
            }

            if (slotStart < timeSlot.endTime) {
                freeTimes.push({
                    day: day,
                    startTime: `${Math.floor(slotStart / 60)}:${("0" + slotStart % 60).slice(-2)}`,
                    endTime: `${Math.floor(timeSlot.endTime / 60)}:${("0" + timeSlot.endTime % 60).slice(-2)}`
                });
            }
        }
    }

    return freeTimes;
};